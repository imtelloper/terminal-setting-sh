import '../style/pages/MainPage.scss';
import { useNavigate } from 'react-router-dom';
import AreaInfo from '../components/AreaInfo';
import { useSWRState } from '../fetcher/useSWRState';
import { useEffect } from 'react';

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
    // navigate('/sensingView');
    // navigate('/setting');
    // navigate('/observe');
    // navigate('/detail');
    /* 강제 부팅 api */
    // axios.get(`http://192.168.0.17:81/api/util/reboot/`).then((res) => {
    //   console.log(res);
    // });
  }, []);

  return (
    <div className="mainContainer">
      <AreaInfo />
    </div>
  );
};

export default MainPage;
