import React, { useEffect } from 'react';
import '../../style/components/LayoutForm.scss';
import NavBar from '../NavBar';
import { useSWRState } from '../../fetcher/useSWRState';
import axios from 'axios';

const LayoutForm = ({ children }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();

  useEffect(() => {
    console.log('🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄api search');
    // for (let i = 1; i < 100; i++) {
    //   axios
    //     .get(`http://192.168.0.${i}:81/api/util/info`, { timeout: 500 })
    //     .then((res) => {
    //       console.log('cam info:', res.data);
    //     })
    //     .catch((err) => '');
    // }
  }, []);

  return (
    <div className="layoutContainer">
      <NavBar />
      <div className="bottomContainer">{children}</div>
    </div>
  );
};

export default LayoutForm;
