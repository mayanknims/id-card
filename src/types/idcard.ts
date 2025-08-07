export interface StudentData {
  id: string;
  name: string;
  idNumber: string;
  fatherName: string;
  batch: string;
  bloodGroup: string;
  mobile: string;
  course: string;
  emergency: string;
  residency: string;
  college: string;
  photoPath: string;
}

export interface FieldConfig {
  key: keyof StudentData | string;
  label: string;
  type: 'text' | 'select';
  options?: string[];
  required?: boolean;
}

export const defaultFieldConfig: FieldConfig[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'idNumber', label: 'ID Number', type: 'text', required: true },
  { key: 'fatherName', label: "Father's Name", type: 'text', required: true },
  { key: 'batch', label: 'Batch', type: 'text', required: true },
  { key: 'bloodGroup', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { key: 'mobile', label: 'Mobile', type: 'text', required: true },
  { key: 'course', label: 'Course', type: 'text', required: true },
  { key: 'emergency', label: 'Emergency', type: 'text' },
  { key: 'residency', label: 'Residency', type: 'select', options: ['DAY SCHOLAR', 'HOSTELLER'] },
  { key: 'college', label: 'College', type: 'text', required: true },
  { key: 'photoPath', label: 'Photo Path', type: 'text', required: true }
];