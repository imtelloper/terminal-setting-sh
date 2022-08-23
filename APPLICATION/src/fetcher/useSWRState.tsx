import useSWR from 'swr';

type SwrStateType = {
  user: {
    email: string;
  };
  curTrackerArea: string;
  curTrackerId: string;
  curCamPort: string;
  curCamCalibImg: string;
  curCamBaseLine: string;
  curCamDangerLine: string;
  curCamIp: string;
  curCamName: string;
  curGroup1Coordinates: Partial<Array<Array<number>>>;
  curGroup2Coordinates: Partial<Array<Array<number>>>;
  streamInfo: Array<ViedeoFrameType>;
  observe: Partial<Observe>;
};

let state: SwrStateType = {
  user: {
    email: '',
  },
  curTrackerArea: '',
  curTrackerId: '',
  curCamPort: '',
  curCamCalibImg: '',
  curCamBaseLine: '',
  curCamDangerLine: '',
  curCamIp: '',
  curCamName: '',
  curGroup1Coordinates: [],
  curGroup2Coordinates: [],
  streamInfo: [],
  observe: {},
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
