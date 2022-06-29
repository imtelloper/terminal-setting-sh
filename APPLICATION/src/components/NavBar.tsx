import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/safety.ai_logo.png';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';

const NaviBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mainTopContainer">
        <div>
          <div className="hamBtnBox">
            <p>
              <span/>
              <span/>
              <span/>
            </p>
          </div>
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={Logo} alt=""/>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            <BsFillPersonFill/>
          </button>
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            <AiFillSetting/>
          </button>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
