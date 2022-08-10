import React from 'react';
import { Link } from 'react-router-dom';

const HorizontalNav = () => {
  return (
    <div className="horizontalContainer">
      <div className="horizontalSlLogo">로고</div>

      <div className="horizontalIconBox">
        <ul className="horizontalLoginMenu">
          <Link to="/loginModal">
            <li>로그인</li>
          </Link>
          <Link to="/signupModal">
            <li>회원가입</li>
          </Link>
          <Link to="/membershipPlan">
            <li>멤버십 플랜</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default HorizontalNav;
