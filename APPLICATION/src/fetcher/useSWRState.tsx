import useSWR from 'swr';

type CamInfo = {
  ip: string;
  camPort: string;
  area: string;
};

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
  streamInfo: Array<ViedeoFrameType>;
  observe: Partial<Observe>;
  camInfo: {
    cam1: CamInfo;
    cam2: CamInfo;
    cam3: CamInfo;
    cam4: CamInfo;
  };
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
  streamInfo: [],
  observe: {},
  camInfo: {
    cam1: {
      ip: '',
      camPort: '',
      area: '',
    },
    cam2: {
      ip: '',
      camPort: '',
      area: '',
    },
    cam3: {
      ip: '',
      camPort: '',
      area: '',
    },
    cam4: {
      ip: '',
      camPort: '',
      area: '',
    },
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
