import React from 'react';
import '../style/components/Card.scss';

const Card = () => {
  return (
    <div className="cardContainer">
      <div className="card">
        <div className="top">
          <div className="left">
            <div className="content" />
          </div>
          <div className="mid">
            <div className="content midContent" />
          </div>
          <div className="right">
            <div className="content" />
          </div>
        </div>
        <div className="bottom">
          <div className="content" />
        </div>
      </div>
    </div>
  );
};

export default Card;
