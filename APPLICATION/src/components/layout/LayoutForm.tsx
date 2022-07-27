import React, { useEffect } from 'react';
import '../../style/components/LayoutForm.scss';
import NavBar from '../NavBar';
import { useSWRState } from '../../fetcher/useSWRState';
import axios from 'axios';

const LayoutForm = ({ children }) => {
  const { data: swrState, mutate: setSwrState } = useSWRState();

  useEffect(() => {}, []);

  return (
    <div className="layoutContainer">
      <NavBar />
      <div className="bottomContainer">{children}</div>
    </div>
  );
};

export default LayoutForm;
