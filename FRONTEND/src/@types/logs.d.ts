export type ILogs = {
  employeeNo: string;
  name: string;
  logState: string;
  time: string;
  duration: string;
  ip: string;
  patientID: string;
  error: string;
  id: string;
  authState: boolean;
  data: string;
  functionModule: 'imgLoad' | 'clinicalDataLoad' | 'analysis' | 'report' | 'else' | null;
  errorType: string;
  repeat: boolean;
  ipAuth: boolean;
};
