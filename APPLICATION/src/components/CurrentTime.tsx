import '../style/components/CurrentTime.scss';
import { useEffect } from 'react';

// @ts-ignore
const CurrentTime = () => {
  const today = new Date();

  const todayDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const todayDay = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });

  useEffect(() => {
    setInterval(todayDate, 1000);
    return () => {
      setInterval(todayDate, 1000);
    };
  }, []);

  return (
    <div className="currentTimeContainer">
      {todayDate}
      &nbsp;
      {todayDay}
    </div>
  );
};

// @ts-ignore
export default CurrentTime;
