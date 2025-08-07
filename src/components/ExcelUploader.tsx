import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import { StudentData } from '@/types/idcard';

interface ExcelUploaderProps {
  onDataLoad: (data: StudentData[]) => void;
  className?: string;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ 
  onDataLoad, 
  className = '' 
}) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const studentData: StudentData[] = jsonData.map((row: any, index: number) => ({
          id: row.id || `student_${index + 1}`,
          name: row.Name || row.name || '',
          idNumber: row['ID No'] || row.idNumber || row.IdNumber || row.id_number || '',
          fatherName: row["Father's Name"] || row.fatherName || row.FatherName || row.father_name || '',
          batch: row.Batch || row.batch || '',
          bloodGroup: row['Blood Group'] || row.bloodGroup || row.BloodGroup || row.blood_group || '',
          mobile: row.Mobile || row.mobile || row.phone || '',
          course: row.Course || row.course || '',
          emergency: row.Emergency || row.emergency || row.emergency_contact || '',
          residency: row.Residency || row.residency || 'DAY SCHOLAR',
          college: row.College || row.college || 'NIMS INSTITUTE OF ENGG. AND TECHNOLOGY',
          photoPath: row.photo || row.photoPath || row.PhotoPath || row.photo_path || row.image || '2.jpg'
        }));

        if (studentData.length === 0) {
          toast.error('No valid data found in the Excel file');
          return;
        }

        onDataLoad(studentData);
        toast.success(`Successfully loaded ${studentData.length} student records`);
      } catch (error) {
        console.error('Error reading Excel file:', error);
        toast.error('Error reading Excel file. Please check the file format.');
      }
    };

    reader.readAsArrayBuffer(file);
    event.target.value = '';
  }, [onDataLoad]);

  const downloadTemplate = () => {
    const templateData = [
      {
        'Name': 'Diya Mehta',
        'ID No': 'STU2025002',
        "Father's Name": 'Suresh Mehta',
        'Batch': '2025-26',
        'Blood Group': 'B+',
        'Mobile': '9876543211',
        'Course': 'BDS',
        'Emergency': '9876543001',
        'Residency': 'Day Scholar',
        'College': 'NIMS Dental College',
        'photo': '2.jpg'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_template.xlsx');
    toast.success('Template downloaded successfully');
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Excel Data Import
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="w-full"
          >
            Download Excel Template
          </Button>
          
          <div className="relative">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="excel-upload"
            />
            <Button className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload Excel File
            </Button>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">Expected columns:</p>
          <ul className="text-xs space-y-1">
            <li>• Name, ID No, Father's Name, Batch</li>
            <li>• Blood Group, Mobile, Course, Emergency</li>
            <li>• Residency, College, photo</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};