import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '../components/CurrentTime';
import AreaInfo from '../components/AreaInfo';
import { useSWRState } from '../fetcher/useSWRState';

const MainPage = () => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const logout = () => {
    console.log('hi');
    sessionStorage.clear();
    setSwrState({ ...swrState, user: null });
    navigate('/login');
  };
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
