import '../style/components/CurrentTime.scss';

const CurrentTime = () => {
  const today = new Date();

  const todayDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const todayDay = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="currentTimeContainer">
      {todayDate}
      &nbsp;
      {todayDay}
    </div>
  );
};

export default CurrentTime;
