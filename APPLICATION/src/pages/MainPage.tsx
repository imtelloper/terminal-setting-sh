import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CraneInfo from '../components/CraneInfo';
import CurrentTime from '../components/CurrentTime';

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
      <CraneInfo />
    </div>
  );
};

export default MainPage;
