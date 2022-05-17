import React, { useEffect, useState } from "react";
import "../../styles/components/module/HorizontalNav.scss";
import { useNavigate } from "react-router-dom";
import { useSWRState } from "../../fetcher/useSWRState";
import { Link } from "react-router-dom";

const HorizontalNav = () => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const onClickIcon = (e) => {
    const tabType = e.currentTarget.getAttribute("datatype");
    switch (tabType) {
      case "home":
        navigate("/main");
        break;
      case "user":
        navigate("/loginModal");
        break;
      case "help":
        navigate("/help");
        break;
      case "setting":
        break;
    }
  };

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
