import useSWR from 'swr';

type SwrStateType = {
  user: {
    email: string;
  };
  observe: Observe;
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
    computeDevice: 'CPU',
    savingPath: '/home/',
    camName: '3크레인 구역1',
    sensingModel: 'small',
    camCoordinate1: '456,307,658,329,536,486,332,469',
    camCoordinate2: '456,307,658,329,536,486,332,469',
    camSafetyLevel: 'Green',
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
