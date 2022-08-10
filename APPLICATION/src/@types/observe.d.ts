// 위험 알림 메세지 -> 없음 | 작업자 진입 확인 | 작업자 위험 반경 진입!

type Observe = {
  _id: string;
  trackerId: string;
  date: string;
  groupNum: number;
  safetyLevel: string;
  yellowCnt: number;
  redCnt: number;
  observeSwitch: boolean;
  observeTime: string;
  createdAt: string;
};

type TrackerObserve = {
  _id: string;
  ip: string;
  date: string;
  groupNum: number;
  observeSwitch: boolean;
  observeTime: string;
  redCnt: number;
  safetyLevel: string;
  trackerId: string;
  yellowCnt: number;
  area: string;
  baseLine: string;
  calibImg: string;
  camName: string;
  camPort: string;
  computeDevice: string;
  createdAt: string;
  dangerLine: string;
  imgSaveSwitch: boolean;
  kakaoSwitch: boolean;
  messageSwitch: boolean;
  savingPath: string;
  sensingGroup1: string;
  sensingGroup2: string;
  sensingModel: string;
  threshold: number;
};

type ViedeoFrameType = {
  ip: string;
  canvasClass: string;
  frameSrc: string;
  trackerId: string;
  baseLine: string;
  dangerLine: string;
  firstCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<Array<number>>;
  };
  secondCanvas: {
    visible: boolean;
    yellowSensingPercent: number;
    redSensingPercent: number;
    coordinate: Array<Array<number>>;
  };
};
