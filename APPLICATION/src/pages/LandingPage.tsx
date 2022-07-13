import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/pages/LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // navigate('/observe');
      // navigate('/main');
      navigate('/detail');
      // navigate('/setting')
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
          <circle cx="170" cy="170" r="160" stroke="#A85CF9" />
          <circle cx="170" cy="170" r="135" stroke="#6240b7" />
          <circle cx="170" cy="170" r="110" stroke="#4B7BE5" />
          <circle cx="170" cy="170" r="85" stroke="#6FDFDF" />
        </svg>
      </div>
      <div className="appTitleContainer">
        <span>Temp Humidity Caster</span>
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
