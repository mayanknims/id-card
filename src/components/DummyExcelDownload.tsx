import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';

export const DummyExcelDownload: React.FC = () => {
  const downloadDummyExcel = () => {
    const dummyData = [
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
        'photo': 'images/student1.jpg'
      },
      {
        'Name': 'Rohan Patel',
        'ID No': 'STU2025003',
        "Father's Name": 'Anil Patel',
        'Batch': '2025-26',
        'Blood Group': 'O+',
        'Mobile': '9876543212',
        'Course': 'BAMS',
        'Emergency': '9876543002',
        'Residency': 'Hostel',
        'College': 'NIMS Ayurveda College',
        'photo': 'images/student2.jpg'
      },
      {
        'Name': 'Sneha Singh',
        'ID No': 'STU2025004',
        "Father's Name": 'Ravi Singh',
        'Batch': '2025-26',
        'Blood Group': 'AB-',
        'Mobile': '9876543213',
        'Course': 'BHMS',
        'Emergency': '9876543003',
        'Residency': 'Day Scholar',
        'College': 'NIMS Homeopathy College',
        'photo': 'images/student3.jpg'
      },
      {
        'Name': 'Amit Kumar',
        'ID No': 'STU2025005',
        "Father's Name": 'Raj Kumar',
        'Batch': '2025-26',
        'Blood Group': 'A+',
        'Mobile': '9876543214',
        'Course': 'B.Tech CSE',
        'Emergency': '9876543004',
        'Residency': 'Hostel',
        'College': 'NIMS Engineering College',
        'photo': 'images/student4.jpg'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(dummyData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'dummy_students.xlsx');
    toast.success('Dummy Excel file downloaded successfully');
  };

  return (
    <Card className="bg-white border-0 shadow-card">
      <CardHeader>
        <CardTitle className="text-primary">Need Sample Data?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Download our dummy Excel file with 3 sample students including image references.
        </p>
        <Button 
          onClick={downloadDummyExcel}
          variant="outline" 
          className="w-full border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Dummy Excel File
        </Button>
      </CardContent>
    </Card>
  );
};