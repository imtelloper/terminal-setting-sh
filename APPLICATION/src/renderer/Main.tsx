import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useCallback, useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import settingIcon from '../../assets/icons/settingPage.png';
import graphIcon from '../../assets/icons/dataGraph.png';
import interxLogo from '../../assets/icons/InterxLogo.png';
import collectData from '../../assets/icons/folder.png';
import temperature from '../../assets/icons/temperature.png';
import clock from '../../assets/icons/clock.png';
import weather from '../../assets/icons/weather-app.png';
import location from '../../assets/icons/web-browser.png';
import weatherTemp from '../../assets/icons/temp.png';
import humidity from '../../assets/icons/wet.png';
// @ts-ignore
import down from '../../assets/icons/download.gif';
// @ts-ignore
import checkCircle from '../../assets/icons/checkCircle.gif';
import '../style/Main.scss';
import CurrentDate from '../components/CurrentDate';
import DataList from '../components/DataList';
import Weather from '../components/Weather';
import Pagination from '../components/Pagination';
import Timer from '../components/Timer';
import ErrorMsgModal from '../components/ErrorMsgModal';
import { useSWRState } from '../fetcher/useSWRState';
import { useInterval } from '../hooks/useInterval';
import { flushSync } from 'react-dom';
/*
 * @Rearlize
 *    top, left, right, bottom으로 위치를 조정하면 UI가 쉽께 깨지고 유지보수가 힘들다.
 *    padding, margin 사용은 flex로 위치를 맞춘 후 미세 조정할때 쓴다.
 *
 * @TODO
 *   location 넣기.(일렉트론이라서 잘 안됨....)
 *   데이터 시각화
 *   지도 시각화
 *   7. 날짜별... 테이블 출력 되어야 된다. 이거는 6번 몬스터를 물리치고 7번 몬스터가 공개된다. 두둥!!!
 *  */

const Main = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const baseUrl = 'http://127.0.0.1:9000/api/temperature-humidity';
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [dataCountState, setDataCountState] = useState(0);
  const [gifDownState, setGifDownState] = useState(false);
  const [gifCheckState, setGifCheckState] = useState(false);
  const [getDataUrlState, setGetDataUrlState] = useState(baseUrl);
  const [timerActiveState, setTimerActiveState] = useState(false);
  const [timerPausedState, setTimerPausedState] = useState(true);
  const [timerTimeState, setTimerTimeState] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addTempIntervalState, setAddTempIntervalState] = useState(false);
  const { data: swrState, mutate: setSwrState } = useSWRState();
  const fetcher = async (url) => axios.get(url).then((res) => res.data);
  const { data: swrTempData } = useSWR(getDataUrlState, fetcher, {
    refreshInterval: 500,
    revalidateOnFocus: true
  });
  const { data: swrModbusData } = useSWR(
    'http://localhost:9000/api/util/',
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true
    }
  );

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `0${today.getMonth() + 1}`.slice(-2);
    const day = `0${today.getDate()}`.slice(-2);
    const hours = today.getHours();
    const mintues = today.getMinutes();
    const seconds = today.getSeconds();
    const dateString = `${year}-${month}-${day} ${hours}:${mintues}:${seconds}`;
    return dateString;
  };

  const setDataCount = () =>
    getTempDataCount().then((res) => setDataCountState(res));

  // 데이터 DB에 추가
  const addTempHumidity = () => {
    setGifCheckState(false);
    setGifDownState(true);
    axios
      .post(baseUrl, {
        temperature: swrModbusData?.temperature,
        humidity: swrModbusData?.humidity,
        weatherTemp: swrState?.weatherData?.temp,
        weather: swrState?.weatherData?.name,
        ip: document.querySelector('#mainContainer').getAttribute('ip'),
        timeStamp: getCurrentDateTime()
      })
      .then((res) => setDataCount())
      .finally(() => {
        setTimeout(() => setGifDownState(false), 1000);
        setTimeout(() => setGifCheckState(true), 1000);
        setTimeout(() => setGifCheckState(false), 1300);
      })
      .catch((err) => console.error(err));
  };

  useInterval(
    () => addTempHumidity(),
    addTempIntervalState ? swrState.addTempDelay : null
  );

  const getTempDataCount = async () => {
    try {
      setLoadingState(true);
      const response = await axios
        .get('http://127.0.0.1:9000/api/temperature-humidity/count/')
        .finally(() => setLoadingState(false));
      return response.data;
    } catch (error) {
      setIsModalOpen(true);
      console.error(error);
    }
  };

  // error message modal
  const showErrorMsg = () => setIsModalOpen(true);

  const handleTimerStart = () => {
    setTimerActiveState(true);
    setTimerPausedState(false);
  };

  const handleTimerReset = () => {
    setTimerActiveState(false);
    setTimerTimeState(0);
  };

  const startAddTemp = async () => {
    setAddTempIntervalState(true);
    handleTimerStart();
  };

  const stopAddTemp = () => {
    flushSync(() => handleTimerReset());
    setGifDownState(false);
    setAddTempIntervalState(false);
  };

  // pagination
  const indexOfLast = currentPage * postsPerPage - 1;
  const indexOfFirst = (currentPage - 1) * postsPerPage;
  const setPageByNumber = (number) => setCurrentPage(number);

  useEffect(() => {
    setDataCount();
    window.electron.ipcRenderer.getIp()
  }, []);

  useEffect(() => {
    let interval = null;
    if (timerActiveState && timerPausedState === false) {
      interval = setInterval(() => setTimerTimeState((time) => time + 10), 10);
    } else clearInterval(interval);
    return () => clearInterval(interval);
  }, [timerActiveState, timerPausedState]);

  useEffect(() => {
    setGetDataUrlState(
      `http://127.0.0.1:9000/api/temperature-humidity/${indexOfFirst}/${postsPerPage}`
    );
  }, [currentPage]);

  // @ts-ignore
  return (
    <div id='mainContainer' className='mainContainer'>
      <div id='ports' />
      <div className='topContainer'>
        <div className='interXLogo'>
          <img width='120px' src={interxLogo} />
        </div>
        <div className='currentDate'>
          <CurrentDate />
        </div>
        <div className='mainIconBox'>
          <div className='graphIcon'>
            <img
              width='25px'
              onClick={() => {
                navigate('/dataGraph');
              }}
              src={graphIcon}
            />
          </div>
          <div className='settingIcon'>
            <img
              width='25px'
              onClick={() => {
                navigate('/setting');
              }}
              src={settingIcon}
            />
          </div>
        </div>
      </div>
      <div className='centerContainer'>
        <div className='buttonContainer'>
          <div>
            {gifDownState && <img className='downloading' src={down} />}
            {gifCheckState && <img className='downloading' src={checkCircle} />}
            <Timer time={timerTimeState} />
          </div>
          <button onClick={startAddTemp}>Start</button>
          <button onClick={stopAddTemp}>Stop</button>
        </div>
      </div>
      <div className='bottomContainer'>
        <div className='titleShowData'>
          <img className='tempImg' width='22px' src={collectData} />
          Collected data
        </div>
        <div className='contentShowData'>
          <div className='dataTitleTempBox'>
            <img className='tempImg' width='20px' src={temperature} />
            <span className='temp'>Temperature</span>
          </div>
          <div className='dataTitleHumiBox'>
            <img className='humiImg' width='20px' src={humidity} />
            <span className='humi'>Humidity</span>
          </div>
          <div className='dataTitleWeatherTempBox'>
            <img className='weatherTempImg' width='20px' src={weatherTemp} />
            <span className='weatherTemp'>WeatherTemp</span>
          </div>
          <div className='dataTitleWeatherBox'>
            <img className='weatherImg' width='20px' src={weather} />
            <span className='weather'>Weather</span>
          </div>
          <div className='dataTitleLocationBox'>
            <img className='locationImg' width='20px' src={location} />
            <span className='location'>IP</span>
          </div>
          <div className='dataTitleTimeBox'>
            <img className='timeImg' width='20px' src={clock} />
            <span className='time'>TimeStamp</span>
          </div>
        </div>
        <div className='showDataContainer'>
          <DataList
            currentPage={currentPage}
            datas={swrTempData || []}
            loading={loadingState}
          />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={dataCountState}
            paginate={setPageByNumber}
            currentPage={currentPage}
          />
        </div>
      </div>
      <div className='footerContainer'>
        <Weather />
      </div>
      <div className='errorModalBox'>{isModalOpen && <ErrorMsgModal />}</div>
    </div>
  );
};

export default Main;
