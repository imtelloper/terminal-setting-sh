import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '../components/CurrentTime';
import AreaInfo from '../components/AreaInfo';
import { useSWRState } from '../fetcher/useSWRState';
import NavBar from '../components/NavBar';

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
      <CurrentTime />
      <AreaInfo />
    </div>
  );
};

export default MainPage;
