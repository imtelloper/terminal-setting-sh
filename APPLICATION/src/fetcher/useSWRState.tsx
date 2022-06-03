import useSWR from 'swr';

type SwrStateType = {
  user: {
    email: string;
  };
  observe: {
    area: 'H3 공장 크레인';
    savingPath: '/home/';
    date: '2022-06-03';
    camOneCoordinate1: '456,307,658,329,536,486,332,469';
    camOneCoordinate2: '456,307,658,329,536,486,332,469';
    camOneSafetyLevel1: 'Green';
    camOneSafetyLevel2: 'Yellow';
    camOneSensing1: 5;
    camOneSensing2: 1;

    camTwoCoordinate1: '456,307,658,329,536,486,332,469';
    camTwoCoordinate2: '456,307,658,329,536,486,332,469';
    camTwoSafetyLevel1: 'Red';
    camTwoSafetyLevel2: '456,307,658,329,536,486,332,469';
    camTwoSensing1: 2;
    camTwoSensing2: 3;

    camThreeCoordinate1: '456,307,658,329,536,486,332,469';
    camThreeCoordinate2: '456,307,658,329,536,486,332,469';
    camThreeSafetyLevel1: 'Green';
    camThreeSafetyLevel2: 'Green';
    camThreeSensing1: 4;
    camThreeSensing2: 5;

    camFourCoordinate1: '456,307,658,329,536,486,332,469';
    camFourCoordinate2: '456,307,658,329,536,486,332,469';
    camFourSafetyLevel1: 'Red';
    camFourSafetyLevel2: 'Yellow';
    camFourSensing1: 6;
    camFourSensing2: 7;
  };
};

let state: SwrStateType = {
  user: {
    email: '',
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
