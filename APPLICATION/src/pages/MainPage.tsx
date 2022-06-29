import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import CurrentTime from '../components/CurrentTime';
import AreaInfo from '../components/AreaInfo';
import { useSWRState } from '../fetcher/useSWRState';
import { useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const navigate = useNavigate();
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const logout = () => {
    console.log('hi');
    sessionStorage.clear();
    setSwrState({ ...swrState, user: null });
    navigate('/login');
  };

  useEffect(() => {
    // navigate('/observe');
    // axios
    //   .post('/api/observe/', observeData, {
    //     withCredentials: false,
    //   })
    //   .then((res) => {
    //     console.log('res', res);
    //   });
    // axios
    //   .get('/api/observe/0/10', {
    //     withCredentials: false,
    //   })
    //   .then((res) => {
    //     console.log('res', res);
    //   });
  }, []);

  return (
    <div className="mainContainer">
      {/*<CurrentTime />*/}
      <AreaInfo />
    </div>
  );
};

export default MainPage;
