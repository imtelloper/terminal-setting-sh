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
  observe: Observe;
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
