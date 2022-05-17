import useSWR from 'swr';

type SwrStateType = {
  tempData: {
    temperature: number,
    humidity: number,
    weatherTemp: number,
    weather: string,
    ip: string,
    timeStamp: string
  },
  weatherData: {
    temp: number,
    name: string
  },
  addTempDelay : number
};

let state: SwrStateType = {
  tempData: {
    temperature: 0,
    humidity: 0,
    weatherTemp: 0,
    weather: "",
    ip: "0.0.0.0",
    timeStamp: ""
  },
  weatherData:{
    temp:0,
    name: ''
  },
  addTempDelay: 3000
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
