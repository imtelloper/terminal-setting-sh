import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '../components/CurrentTime';
import AreaInfo from '../components/AreaInfo';
import { useSWRState } from '../fetcher/useSWRState';
import { useEffect } from 'react';
import axios from 'axios';
import { getFetcher } from '../fetcher/fetcher';
import useSWR from 'swr';

const MainPage = () => {
  const navigate = useNavigate();

  const { data: swrState, mutate: setSwrState } = useSWRState();

  const logout = () => {
    console.log('hi');
    sessionStorage.clear();
    setSwrState({ ...swrState, user: null });
    navigate('/login');
  };

  const observeData: Observe = {
    area: 'H3 공장 크레인',
    camPort: 'cam1',
    activate: true,
    alarms: '없음',
    date: '2022-06-03',
    computeDevice: 'cpu',
    savingPath: '/home/',
    camName: '3크레인 구역1',
    sensingModel: 'small',
    camCoordinate1: '456,307,658,329,536,486,332,469',
    camCoordinate2: '456,307,658,329,536,486,332,469',
    camSafetyLevel1: 'Green',
    camSafetyLevel2: 'Yellow',
    camSensing1: 5,
    camSensing2: 1,
  };

  useEffect(() => {
    // axios
    //   .post('/api/observe/', observeData, {
    //     withCredentials: false,
    //   })
    //   .then((res) => {
    //     console.log('res', res);
    //   });

    axios
      .get('/api/observe/0/10', {
        withCredentials: false,
      })
      .then((res) => {
        console.log('res', res);
      });
  }, []);

  return (
    <div className="mainContainer">
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
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>
      <CurrentTime />
      <AreaInfo />
    </div>
  );
};

export default MainPage;
