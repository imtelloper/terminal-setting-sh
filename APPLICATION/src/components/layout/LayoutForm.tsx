import React from 'react';
import '../../style/components/LayoutForm.scss';
import NavBar from '../NavBar';

const LayoutForm = ({ children }) => {
  return (
    <div className="layoutContainer">
      <NavBar />
      <div className="bottomContainer">{children}</div>
    </div>
  );
};

export default LayoutForm;
