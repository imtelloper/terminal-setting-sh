export interface IUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  ip: string;
  lastLogin: string;
  deactivate: boolean;
  sixMonth: boolean;
  emailCert: boolean;
  department: string;
  employeeNo: string;
  isAdmin: boolean;
  auth: boolean;
  job: 'nurse' | 'doctor' | 'radiologist' | null;
  imageLoadCert: 'empty' | 'yes' | 'no' | null;
  clinicalDataCert: 'empty' | 'yes' | 'no' | null;
  analysisCert: 'empty' | 'yes' | 'no' | null;
  reportCert: 'empty' | 'yes' | 'no' | null;
}
