import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploaderProps {
  studentId: string;
  currentImage?: string;
  onImageUpdate: (studentId: string, imagePath: string) => void;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  studentId,
  currentImage,
  onImageUpdate,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    setUploading(true);

    // Create a unique filename
    const fileName = `${studentId}_${Date.now()}.${file.name.split('.').pop()}`;
    
    // In a real application, you would upload to a server or cloud storage
    // For this demo, we'll create a blob URL
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate upload delay
    setTimeout(() => {
      onImageUpdate(studentId, imageUrl);
      setUploading(false);
      toast.success('Image uploaded successfully');
    }, 1000);

    event.target.value = '';
  }, [studentId, onImageUpdate]);

  const removeImage = () => {
    onImageUpdate(studentId, '');
    toast.success('Image removed');
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="p-4">
        {currentImage ? (
          <div className="space-y-3">
            <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden">
              <img 
                src={currentImage} 
                alt="Student" 
                className="w-full h-full object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={removeImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id={`image-upload-${studentId}`}
                disabled={uploading}
              />
              <Button 
                variant="outline" 
                className="w-full" 
                disabled={uploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Change Image'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id={`image-upload-${studentId}`}
                disabled={uploading}
              />
              <Button 
                variant="outline" 
                className="w-full" 
                disabled={uploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};