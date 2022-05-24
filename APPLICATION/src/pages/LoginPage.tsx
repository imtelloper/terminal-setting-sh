import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/pages/LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="loginContainer">
      <div className="loginBox">
        Sign In
        <div className="inputLoginBox">
          <input placeholder="이메일을 입력하세요." />
          <input placeholder="비밀번호를 입력하세요" />
        </div>
        <div className="loginBtnBox">
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
