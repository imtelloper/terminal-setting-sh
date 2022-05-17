import useSWR from 'swr';
import { IUser } from '../../@types/user';

type PatientType = {
  id: string;
  birth: string;
  age: number;
  sex: string;
  date: string;
  region: string;
  clinicalDataType: string;
};

type PacsImgType = {
  id: string;
  img: string;
  type: string;
  studyDate: string;
  modality: string;
};

// ############### SwrStateType
type SwrStateType = {
  user: IUser;
  employeeNo: string;
  email: string;
  name: string;
  logState: string;
  time: string;
  duration: string;
  ip: string;
  patientID: string;
  error: string;
  loginTime: string;
  loginLogId: string;
  differentIp: boolean;
  tenMinutesNotUsed: boolean;
  pacsImgState: Array<PacsImgType>;
  findImgState: {
    patientId: string;
    sex: string;
    age1: string;
    age2: string;
    notes: string;
  };
  clinicLoadData: {
    id: string;
    birth: string;
    age: string;
    sex: string;
    date: string;
    region: string;
    clinicTypeEMR: boolean;
    clinicTypeNationCheck: boolean;
    clinicTypeNomalCheck: boolean;
  };
  navTabStatus: {
    load: boolean;
    imgLoad: boolean;
    clinicLoad: boolean;
    analysis: boolean;
    report: boolean;
  };
};

let state: SwrStateType = {
  user: {
    id: '',
    ip: '',
    username: '',
    email: '',
    department: '',
    employeeNo: '',
    lastLogin: '',
    createdAt: '',
    auth: false,
    deactivate: false,
    emailCert: false,
    isAdmin: false,
    job: null,
    sixMonth: false,
    imageLoadCert: null,
    clinicalDataCert: null,
    analysisCert: null,
    reportCert: null,
  },
  employeeNo: '',
  email: '',
  name: '',
  logState: '',
  time: '',
  duration: '',
  ip: '',
  patientID: '',
  error: '',
  loginTime: '',
  loginLogId: '',
  differentIp: false,
  tenMinutesNotUsed: false,
  pacsImgState: [],
  findImgState: {
    patientId: '',
    sex: '',
    age1: '',
    age2: '',
    notes: '',
  },
  clinicLoadData: {
    id: '',
    birth: '',
    age: '',
    sex: '',
    date: '',
    region: '',
    clinicTypeEMR: true,
    clinicTypeNationCheck: false,
    clinicTypeNomalCheck: false,
  },
  navTabStatus: {
    load: false,
    imgLoad: false,
    clinicLoad: false,
    analysis: false,
    report: false,
  },
};

export const useSWRState = () => {
  const { data, mutate } = useSWR<SwrStateType>('state', () => state);

  return {
    data,
    mutate: (value: SwrStateType) => {
      state = value;
      return mutate();
    },
  };
};
