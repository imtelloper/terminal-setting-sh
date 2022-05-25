import useSWR from 'swr';

type SwrStateType = {
  user: {
    email: string;
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
