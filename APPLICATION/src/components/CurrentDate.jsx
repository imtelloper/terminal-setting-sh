import React from "react";


const CurrentDate = () => {
  const today = new Date();

  const todayDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const todayDay = today.toLocaleDateString('en-US', {
    weekday: 'long',
  })
  return (
    <>
      {todayDate}
      &nbsp;
      {todayDay}
    </>
  );
};

export default CurrentDate;
