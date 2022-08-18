import '../style/components/CurrentTime.scss';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

const CurrentTime = () => {
  const today = new Date();

  const year = today.toLocaleDateString('ko-KO', {
    year: 'numeric',
  });

  const month = today.toLocaleDateString('ko-KR', {
    month: '2-digit',
  });

  const day = today.toLocaleDateString('ko-KO', {
    day: '2-digit',
  });

  const weekday = today.toLocaleDateString('ko-KO', {
    weekday: 'long',
  });

  const padNumber = (num, length) => {
    return String(num).padStart(length, '0');
  };

  let now = new Date();
  const [hour, setHour] = useState(padNumber(now.getHours(), 2));
  const [min, setMin] = useState(padNumber(now.getMinutes(), 2));
  const [sec, setSec] = useState(padNumber(now.getSeconds(), 2));
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      now = new Date();
      setHour(padNumber(now.getHours(), 2));
      setMin(padNumber(now.getMinutes(), 2));
      setSec(padNumber(now.getSeconds(), 2));
    }, 1000);
    // clean-up 함수 리턴!
    return () => clearInterval(interval.current);
  }, []);

  const searchIps = () => {
    console.log('🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄🍄api search');
    for (let i = 2; i < 255; i++) {
      axios
        .get(`http://192.168.0.${i}:81/api/util/info`, { timeout: 500 })
        .then((res) => {
          console.log('cam info:', res.data);
        })
        .catch((err) => '');
    }
  };

  return (
    <div className="currentTimeContainer" onClick={searchIps}>
      <span>{year.slice(0, 4)}</span>
      <span>
        {month.slice(0, 2)}
        <p>/</p>
        {day.slice(0, 2)} <span>{weekday}</span>
      </span>
      <span>
        {hour}
        <p>:</p>
        {min}
        <p>:</p>
        {sec}
      </span>
    </div>
  );
};

export default CurrentTime;
