import useSWR from 'swr';

type SwrStateType = {
  user: {
    email: string;
  };
  observe: {
    area: string;
    camPort: string;
    activate: boolean;
    alarms: '없음' | '작업자 진입 확인' | '작업자 위험 반경 진입!';
    date: string;
    computeDevice: string;
    savingPath: string;
    camName: string;
    sensingModel: string;
    camCoordinate1: string;
    camCoordinate2: string;
    camSafetyLevel1: string;
    camSafetyLevel2: string;
    camSensing1: number;
    camSensing2: number;
  };
};

let state: SwrStateType = {
  user: {
    email: '',
  },
  observe: {
    area: 'H3 공장 크레인',
    camPort: 'cam1',
    activate: true,
    alarms: '없음',
    date: '2022-06-03',
    computeDevice: 'cpu',
    savingPath: '/home/',
    camName: '3크레인 구역1',
    sensingModel: 'small',
    camCoordinate1: '456,307,658,329,536,486,332,469',
    camCoordinate2: '456,307,658,329,536,486,332,469',
    camSafetyLevel1: 'Green',
    camSafetyLevel2: 'Yellow',
    camSensing1: 5,
    camSensing2: 1,
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
