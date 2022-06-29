import '../style/components/CurrentTime.scss';

const CurrentTime = () => {
  const today = new Date();

  // const todayDate = today.toLocaleDateString('ko-KR', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });
  //
  // const todayDay = today.toLocaleDateString('ko-KR', {
  //   weekday: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  // });

  const year = today.toLocaleDateString('ko-KO',{
    year: 'numeric',
  });

  const month = today.toLocaleDateString('ko-KR',{
    month: '2-digit',
  });

  const day = today.toLocaleDateString('ko-KO',{
    day: '2-digit',
  });

  const weekday = today.toLocaleDateString('ko-KO',{
    weekday: 'long',
  });

  // const hour = today.toLocaleTimeString('ko-KO',{
  //   hour: '2-digit',
  // });
  //
  // const minute = today.toLocaleTimeString('ko-KO',{
  //   minute: '2-digit',
  // });
  //
  // const second = today.toLocaleTimeString('ko-KO',{
  //   second: '2-digit',
  // });

  const hours = ('0' + today.getHours()).slice(-2);
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2);
  const timeString = hours + ':' + minutes  + ':' + seconds;

  console.log(timeString);

  return (
    <div className="currentTimeContainer">
      <p>{year.slice(0,4)}</p>
      <p>{month.slice(0,2)}<span>/</span>{day.slice(0,2)} <p>{weekday}</p></p>
      <p>{hours}<span>:</span>{minutes}<span>:</span>{seconds}</p>
    </div>
  );
};

export default CurrentTime;
