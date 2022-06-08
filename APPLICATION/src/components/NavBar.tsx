import React from 'react';
import { useNavigate } from 'react-router-dom';

const NaviBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mainTopContainer">
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </button>
        <div>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            설정
          </button>
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            계정정보
          </button>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
