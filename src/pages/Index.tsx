import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExcelUploader } from '@/components/ExcelUploader';
import { IdCard } from '@/components/IdCard';
import { FieldEditor } from '@/components/FieldEditor';
import { BulkActions } from '@/components/BulkActions';
import { ImageUploader } from '@/components/ImageUploader';
import { DummyExcelDownload } from '@/components/DummyExcelDownload';
import { StudentData, FieldConfig, defaultFieldConfig } from '@/types/idcard';
import { Users, FileSpreadsheet, Settings, Download, GraduationCap } from 'lucide-react';

const Index = () => {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [fieldConfig, setFieldConfig] = useState<FieldConfig[]>(defaultFieldConfig);

  const handleImageUpdate = (studentId: string, imagePath: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, photoPath: imagePath }
        : student
    ));
    
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(prev => prev ? { ...prev, photoPath: imagePath } : null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Professional Header */}
      <div className="bg-gradient-to-r from-primary to-primary-hover shadow-elevated">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-3 rounded-xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                NIMS ID Card Dashboard
              </h1>
              <p className="text-white/80 text-lg">
                Professional student ID card management system
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 -mt-6 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-primary">{students.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cards Ready</p>
                  <p className="text-3xl font-bold text-success">{students.filter(s => s.photoPath).length}</p>
                </div>
                <FileSpreadsheet className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Missing Photos</p>
                  <p className="text-3xl font-bold text-warning">{students.filter(s => !s.photoPath).length}</p>
                </div>
                <Settings className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <div className="bg-white rounded-xl p-2 shadow-card">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger value="upload" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <FileSpreadsheet className="h-4 w-4" />
                Data Import
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Users className="h-4 w-4" />
                Preview Cards
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Settings className="h-4 w-4" />
                Field Settings
              </TabsTrigger>
              <TabsTrigger value="generate" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white">
                <Download className="h-4 w-4" />
                Bulk Generate
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <ExcelUploader onDataLoad={setStudents} />
                <DummyExcelDownload />
              </div>
              
              {students.length > 0 && (
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Users className="h-5 w-5" />
                      Loaded Students
                      <Badge variant="secondary" className="ml-auto bg-primary text-white">
                        {students.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      {students.map((student, index) => (
                        <div key={student.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary-light to-secondary border border-primary/20">
                          <div>
                            <span className="font-medium text-primary">{student.name}</span>
                            <p className="text-sm text-muted-foreground">{student.course}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!student.photoPath && (
                              <Badge variant="destructive" className="text-xs">No Photo</Badge>
                            )}
                            <Badge variant="outline" className="border-primary text-primary">{student.idNumber}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {students.length === 0 ? (
              <Card className="bg-white border-0 shadow-card">
                <CardContent className="p-12 text-center">
                  <Users className="h-16 w-16 mx-auto text-primary/30 mb-6" />
                  <h3 className="text-xl font-semibold mb-3 text-primary">No Students Loaded</h3>
                  <p className="text-muted-foreground text-lg">
                    Please upload an Excel file with student data first.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-white border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-primary">Student List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedStudent?.id === student.id
                              ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-button'
                              : 'bg-gradient-to-r from-primary-light to-secondary hover:shadow-md'
                          }`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-medium">{student.name}</span>
                              <p className={`text-sm ${selectedStudent?.id === student.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                                {student.course}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {!student.photoPath && (
                                <div className="w-2 h-2 bg-warning rounded-full"></div>
                              )}
                              <Badge
                                variant={selectedStudent?.id === student.id ? 'secondary' : 'outline'}
                                className={selectedStudent?.id === student.id ? 'bg-white/20 text-white' : 'border-primary text-primary'}
                              >
                                {student.idNumber}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedStudent && (
                  <>
                    <div className="space-y-6">
                      <IdCard 
                        student={selectedStudent} 
                        className="max-w-full"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <Card className="bg-white border-0 shadow-card">
                        <CardHeader>
                          <CardTitle className="text-primary">Student Photo</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ImageUploader
                            studentId={selectedStudent.id}
                            currentImage={selectedStudent.photoPath}
                            onImageUpdate={handleImageUpdate}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <FieldEditor
              fields={fieldConfig}
              onFieldsChange={setFieldConfig}
              className="bg-white border-0 shadow-card"
            />
          </TabsContent>

          <TabsContent value="generate">
            <BulkActions
              students={students}
              className="bg-white border-0 shadow-card"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;