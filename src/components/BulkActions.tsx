import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Download, FileImage, FileText, Package } from 'lucide-react';
import { toast } from 'sonner';
import { StudentData } from '@/types/idcard';
import { generatePDF, generateImage } from '@/lib/cardGenerator';
import JSZip from 'jszip';

interface BulkActionsProps {
  students: StudentData[];
  className?: string;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  students,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateBulkPDFs = async () => {
    if (students.length === 0) {
      toast.error('No student data available');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const total = students.length;

      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        setProgress((i / total) * 100);
        
        try {
          const pdfBlob = await generatePDF(student);
          const fileName = `${student.name.replace(/\s+/g, '_')}_${student.idNumber}.pdf`;
          zip.file(fileName, pdfBlob);
        } catch (error) {
          console.error(`Error generating PDF for ${student.name}:`, error);
          toast.error(`Failed to generate PDF for ${student.name}`);
        }
      }

      setProgress(100);
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ID_Cards_PDFs_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Successfully generated ${students.length} PDF files`);
    } catch (error) {
      console.error('Error generating bulk PDFs:', error);
      toast.error('Failed to generate bulk PDFs');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateBulkImages = async () => {
    if (students.length === 0) {
      toast.error('No student data available');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const total = students.length;

      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        setProgress((i / total) * 100);
        
        try {
          const imageBlob = await generateImage(student);
          const fileName = `${student.name.replace(/\s+/g, '_')}_${student.idNumber}.jpg`;
          zip.file(fileName, imageBlob);
        } catch (error) {
          console.error(`Error generating image for ${student.name}:`, error);
          toast.error(`Failed to generate image for ${student.name}`);
        }
      }

      setProgress(100);
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ID_Cards_Images_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Successfully generated ${students.length} image files`);
    } catch (error) {
      console.error('Error generating bulk images:', error);
      toast.error('Failed to generate bulk images');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const generateBulkAll = async () => {
    if (students.length === 0) {
      toast.error('No student data available');
      return;
    }

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const pdfFolder = zip.folder('PDFs');
      const imageFolder = zip.folder('Images');
      const total = students.length * 2; // Both PDF and image for each student
      let processed = 0;

      for (const student of students) {
        try {
          // Generate PDF
          const pdfBlob = await generatePDF(student);
          const pdfFileName = `${student.name.replace(/\s+/g, '_')}_${student.idNumber}.pdf`;
          pdfFolder?.file(pdfFileName, pdfBlob);
          processed++;
          setProgress((processed / total) * 100);

          // Generate Image
          const imageBlob = await generateImage(student);
          const imageFileName = `${student.name.replace(/\s+/g, '_')}_${student.idNumber}.jpg`;
          imageFolder?.file(imageFileName, imageBlob);
          processed++;
          setProgress((processed / total) * 100);
        } catch (error) {
          console.error(`Error generating files for ${student.name}:`, error);
          toast.error(`Failed to generate files for ${student.name}`);
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ID_Cards_Complete_${new Date().toISOString().split('T')[0]}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`Successfully generated all files for ${students.length} students`);
    } catch (error) {
      console.error('Error generating bulk files:', error);
      toast.error('Failed to generate bulk files');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Bulk Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Generating files...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={generateBulkPDFs}
            disabled={isGenerating || students.length === 0}
            className="w-full"
          >
            <FileText className="mr-2 h-4 w-4" />
            Generate All PDFs ({students.length})
          </Button>

          <Button
            onClick={generateBulkImages}
            disabled={isGenerating || students.length === 0}
            variant="outline"
            className="w-full"
          >
            <FileImage className="mr-2 h-4 w-4" />
            Generate All Images ({students.length})
          </Button>

          <Button
            onClick={generateBulkAll}
            disabled={isGenerating || students.length === 0}
            variant="secondary"
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" />
            Generate All Files ({students.length})
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>Files will be downloaded as ZIP archives.</p>
          <p>Each student gets separate PDF and image files.</p>
        </div>
      </CardContent>
    </Card>
  );
};