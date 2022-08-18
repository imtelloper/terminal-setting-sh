import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/pages/LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // navigate('/observe');
      navigate('/main');
      // navigate('/detail');
      // navigate('/setting');
      // navigate('/login');
      // navigate('/allListCheck');
    }, 300);
  }, []);

  return (
    <>
      <div className="circleContainer">
        <svg
          className="loader"
          xmlns="http:www.w3.org/2000/svg"
          viewBox="0 0 340 340"
        >
          <circle cx="170" cy="170" r="160" stroke="#1E2941" />
          <circle cx="170" cy="170" r="135" stroke="#5ED057" />
          <circle cx="170" cy="170" r="110" stroke="#FCB72B" />
          <circle cx="170" cy="170" r="85" stroke="#FE0A02" />
        </svg>
      </div>
      <div className="appTitleContainer">
        <span>SAFETY-AI</span>
      </div>

      <div className="appBottomContainer">
        <div className="coast">
          <div className="logoWrap">
            <div className="interX" />
          </div>
        </div>
        <div className="coast delay">
          <div className="waveWrap">
            <div className="wave delay" />
          </div>
        </div>
        <div className="logoText logoTextI">I</div>
        <div className="logoText logoTextN">N</div>
        <div className="logoText logoTextT">T</div>
        <div className="logoText logoTextE">E</div>
        <div className="logoText logoTextR">R</div>
        <div className="logoText logoTextX">X</div>
      </div>
    </>
  );
};

export default LandingPage;
