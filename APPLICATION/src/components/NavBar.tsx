import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/safety.ai_logo.png';
import MenuIcon from '../images/menu.png';
import { Person, Settings } from '@material-ui/icons';

const NaviBar = () => {
  const navigate = useNavigate();

  const handleHamBtn = (e) => {
    const target = e.currentTarget;
    target.classList.toggle('hamBtnActive');
  };

  return (
    <>
      <div className="mainTopContainer">
        <div>
          <div className="hamBtnBox">
            <div className="hamBtn" onClick={handleHamBtn}>
              <span className="first" />
              <span className="second" />
              <span className="third" />
            </div>
          </div>
          <button
            className="logo"
            onClick={() => {
              navigate('/');
            }}
          >
            <img src={Logo} alt="" />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              navigate('/login');
            }}
          >
            <span className="iconBox" />
            <span className="icon">
              <Person />
            </span>
          </button>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            <span className="iconBox" />
            <span className="icon">
              <Settings />
            </span>
          </button>
          <button
            onClick={() => {
              navigate('/setting');
            }}
          >
            <span className="iconBox" />
            <span className="icon">
              <img src={MenuIcon} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NaviBar;
