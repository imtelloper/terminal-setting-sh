import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/DesignSystem.scss';
import '../style/pages/LoginPage.scss';
import useSWR from 'swr';
import Api from '../api/Api';
import { useSWRState } from '../fetcher/useSWRState';

import LogoImg from '../images/safety.ai_logo.png';
import LoginBg from '../images/loginBg.png';
import WorldIcon from '../images/world.png';
import ArrowDown from '../images/arrow-down.png';

const LoginPage = () => {
  const navigate = useNavigate();

  const { data: swrState, mutate: setSwrState } = useSWRState();

  const [inputState, setInputState] = useState({
    email: '',
    pw: '',
    emailValid: false,
    pwValid: false,
  });

  const checkEmail = (e: FormEvent<HTMLInputElement>) => {
    const email = e.currentTarget.value;
    const re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!email.includes('@') && email.length > 64) {
      const emailEle = document.getElementById('email') as HTMLInputElement;
      emailEle.value = emailEle?.value?.substr(0, emailEle.value.length - 1);
      return;
    }

    if (email.length !== 0) {
      if (!re.test(email))
        setInputState((prevState) => ({
          ...prevState,
          email,
          emailValid: false,
        }));
      else
        setInputState((prevState) => ({
          ...prevState,
          email,
          emailValid: true,
        }));
    } else setInputState((prevState) => ({ ...prevState, email }));
  };

  const checkPw = (e: FormEvent<HTMLInputElement>) => {
    const pw = e.currentTarget.value;
    // 6-16자의 영문/숫자/특수문자 조합만 가능합니다.
    const check =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;

    if (pw.length !== 0) {
      if (!check.test(pw))
        setInputState((prevState) => ({ ...prevState, pw, pwValid: false }));
      else setInputState((prevState) => ({ ...prevState, pw, pwValid: true }));
    } else setInputState((prevState) => ({ ...prevState, pw }));
  };

  const setUserInfo = () => {
    if (!sessionStorage.getItem('authToken')) return;
    Api.login
      .getUserInfo(sessionStorage.getItem('authToken'))
      .then((res) => {
        console.log('Api.login.getUserInfo', res);
        setSwrState({ ...swrState, user: { email: res?.email } });
      })
      .catch((err) => console.error(err));
  };

  // eslint-disable-next-line consistent-return
  const login = () => {
    if (!inputState.emailValid) return alert('아이디가 올바르지 않습니다.');
    if (!inputState.pwValid) return alert('비밀번호가 올바르지 않습니다.');
    if (!inputState.email) return alert('이메일을 입력해주세요');
    if (!inputState.pw) return alert('비밀번호를 입력해주세요');

    /* 로그인 */
    Api.login
      .loginAndGetToken(inputState)
      .then((res) => {
        /* authToken키로 세션 저장 */
        if (res) sessionStorage.setItem('authToken', res.access_token);
        setUserInfo();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    /* 토큰으로 로그인 정보를 불러와 세션에 셋팅함 */
    // setUserInfo();
    // navigate('/main');
    navigate('/login')
  }, []);

  const handleEnter = (e) => e.key === 'Enter' && login();

  useEffect(() => {
    console.log('swrState', swrState);
    swrState?.user?.email && navigate('/');
  }, [swrState]);

  // if (loading) return <Loading />;
  // if (error) alert(error);

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="left">
          <div className="logoImg">
            <img src={LogoImg} />
          </div>
          <div className="loginBg">
            <img src={LoginBg} />
          </div>
        </div>
        <div className="right">
          <div className="top">
            <span className="title">SIGN IN</span>
            {/* <p><WorldIcon/></p> */}
            <div className="inputLoginBox">
              <div className="content">
                <label>ID</label>
                <input
                  className="form"
                  id="id"
                  placeholder="이메일을 입력하세요."
                  maxLength={320}
                  onChange={checkEmail}
                  value={inputState.email}
                />
              </div>
              <div className="content">
                <label>Password</label>
                <input
                  className="form"
                  id="pwd"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  maxLength={16}
                  onChange={checkPw}
                  value={inputState.pw}
                  onKeyPress={handleEnter}
                />
              </div>
            </div>
          </div>
          <button className="btnR defaultPrimary">LOG IN</button>
        </div>
      </div>
      <div className="interX">© INTERX</div>
    </div>
  );
};

export default LoginPage;
