import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../style/Weather.scss';
import Clouds from '../../assets/icons/weatherIcons/clouds.png';
import Default from '../../assets/icons/weatherIcons/default.png';
import Drizzle from '../../assets/icons/weatherIcons/drizzle.png';
import Rain from '../../assets/icons/weatherIcons/rain.png';
import Smog from '../../assets/icons/weatherIcons/smog.png';
import Snow from '../../assets/icons/weatherIcons/snow.png';
import Sun from '../../assets/icons/weatherIcons/sun.png';
import Thunderstorm from '../../assets/icons/weatherIcons/thunderstorm.png';
import { useSWRState } from '../fetcher/useSWRState';
import useSWR from 'swr';

const Weather = () => {
  const [weatherState, setWeatherState] = useState<{
    temp: number;
    desc: string;
    icon: string;
    name: string;
    loading: boolean;
  }>();
  const [iconState, setIconState] = useState<{ image: string }>();
  const [isGetWeatherInterval, setIsGetWeatherInterval] = useState(false);
  const [getWeatherIntervalState, setGetWeatherIntervalState] = useState();
  const cityName = 'Ulsan';
  const apiKey = 'f9dc1973381dc158600994e12a99a1e1';
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const imgSrc = `http://openweathermap.com/img/w/${
    weatherState && weatherState.icon
  }.png`;
  // const fetcher = async (url) => axios.get(url).then((res) => res.data);
  // const { data: weatherSWRData } = useSWR(weatherUrl, fetcher, {
  //   refreshInterval: 5000,
  // });
  const { data: swrState, mutate: setSwrState } = useSWRState();

  const getWeather = () => {
    axios
      .get(weatherUrl)
      .then((res) => {
        const data = res.data;
        let weatherInfo = data?.weather[0]?.main;
        setWeatherState({
          temp: parseFloat((data?.main?.temp - 273.15)?.toFixed(1)),
          desc: data?.weather[0]?.description,
          icon: data?.weather[0]?.icon,
          name: weatherInfo,
          loading: false,
        });
        const weatherInfoObj = {
          Clouds: Clouds,
          Clear: Sun,
          Thunderstorm: Thunderstorm,
          Drizzle: Drizzle,
          Rain: Rain,
          Snow: Snow,
          Atmosphere: Smog,
        };
        setIconState({
          image: weatherInfoObj[weatherInfo]
            ? weatherInfoObj[weatherInfo]
            : Default,
        });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWeather();
    // @ts-ignore
    setGetWeatherIntervalState(setInterval(() => getWeather(), 5000));
    return () => clearInterval(getWeatherIntervalState);
  }, []);

  useEffect(() => {
    if ((swrState?.weatherData, weatherState)) {
      setSwrState({
        ...swrState,
        weatherData: {
          temp: weatherState.temp,
          name: weatherState.name,
        },
      });
    }
  }, [swrState, weatherState]);

  if (weatherState && weatherState.loading) {
    return <p>Loading</p>;
  } else {
    return (
      <div className="WeatherContainer">
        <div className="weatherIcon">
          <img src={iconState && iconState.image} width="40px" />
        </div>
        <div className="weatherTemp">
          {weatherState && weatherState.temp.toString()}°C
        </div>
        <div className="weatherName">{weatherState && weatherState.name}</div>
      </div>
    );
  }
};

export default Weather;
