type Observe = {
  area: string;
  camPort: 'cam1' | 'cam2' | 'cam3' | 'cam4';
  activate: boolean;
  alarms: '없음' | '작업자 진입 확인' | '작업자 위험 반경 진입!';
  date: string;
  computeDevice: 'CPU' | 'GPU';
  savingPath: string;
  camName: string;
  sensingModel: string;
  camCoordinate1: string;
  camCoordinate2: string;
  // 안전 등급
  camSafetyLevel: 'Green' | 'Yellow' | 'Red';
  // 감지 수
  camSensing1: number;
  camSensing2: number;
};
