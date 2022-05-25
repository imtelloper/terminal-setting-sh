import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '../components/CurrentTime';
import AreaInfo from '../components/AreaInfo';

const MainPage = () => {
  const navigate = useNavigate();
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
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인
        </button>
      </div>
      <CurrentTime />
      <AreaInfo />
    </div>
  );
};

export default MainPage;
