// export const camPort1Ip = '192.168.0.34';
// export const camPort2Ip = '192.168.0.26';
// export const camPort3Ip = '192.168.0.36';
// export const camPort4Ip = '192.168.0.30';

export const initVideoFrameData: Array<ViedeoFrameType> = [
  {
    ip: '',
    canvasClass: 'polygonCanvas1',
    // frameSrc: `http://${camPort1Ip}:81`,
    frameSrc: '',
    trackerId: '',
    baseLine: '',
    dangerLine: '',
    firstCanvas: {
      visible: false,
      yellowSensingPercent: 1.37,
      redSensingPercent: 0.3,
      coordinate: [
        // [185, 236],
        // [90, 93],
        // [186, 109],
        // [268, 203],
      ],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [
        // [185, 236],
        // [90, 93],
        // [186, 109],
        // [268, 203],
      ],
    },
  },
  {
    ip: '',
    canvasClass: 'polygonCanvas2',
    // frameSrc: `http://${camPort2Ip}:81`,
    frameSrc: '',
    trackerId: '',
    baseLine: '',
    dangerLine: '',
    firstCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [
        // [242, 122],
        // [298, 139],
        // [296, 189],
        // [239, 191],
      ],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    ip: '',
    canvasClass: 'polygonCanvas3',
    // frameSrc: `http://${camPort3Ip}:81`,
    frameSrc: '',
    trackerId: '',
    baseLine: '',
    dangerLine: '',
    firstCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
  {
    ip: '',
    canvasClass: 'polygonCanvas4',
    // frameSrc: `http://${camPort4Ip}:81`,
    frameSrc: '',
    trackerId: '',
    baseLine: '',
    dangerLine: '',
    firstCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
    secondCanvas: {
      visible: false,
      yellowSensingPercent: 0.7,
      redSensingPercent: 0.3,
      coordinate: [],
    },
  },
];
