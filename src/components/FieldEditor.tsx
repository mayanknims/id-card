import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Settings } from 'lucide-react';
import { FieldConfig } from '@/types/idcard';

interface FieldEditorProps {
  fields: FieldConfig[];
  onFieldsChange: (fields: FieldConfig[]) => void;
  className?: string;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({
  fields,
  onFieldsChange,
  className = ''
}) => {
  const updateField = (index: number, updates: Partial<FieldConfig>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    onFieldsChange(newFields);
  };

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    onFieldsChange(newFields);
  };

  const addField = () => {
    const newField: FieldConfig = {
      key: `custom_${Date.now()}` as any,
      label: 'New Field',
      type: 'text',
      required: false
    };
    onFieldsChange([...fields, newField]);
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Field Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-96 overflow-y-auto space-y-3">
          {fields.map((field, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Field {index + 1}</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeField(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`label-${index}`} className="text-xs">
                    Display Label
                  </Label>
                  <Input
                    id={`label-${index}`}
                    value={field.label}
                    onChange={(e) => updateField(index, { label: e.target.value })}
                    className="h-8"
                  />
                </div>
                
                <div>
                  <Label htmlFor={`type-${index}`} className="text-xs">
                    Field Type
                  </Label>
                  <Select
                    value={field.type}
                    onValueChange={(value: 'text' | 'select') => 
                      updateField(index, { type: value })
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {field.type === 'select' && (
                <div>
                  <Label className="text-xs">Options (comma separated)</Label>
                  <Input
                    value={field.options?.join(', ') || ''}
                    onChange={(e) => 
                      updateField(index, { 
                        options: e.target.value.split(',').map(s => s.trim()) 
                      })
                    }
                    placeholder="Option 1, Option 2, Option 3"
                    className="h-8"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={addField}
          className="w-full"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Custom Field
        </Button>
      </CardContent>
    </Card>
  );
};