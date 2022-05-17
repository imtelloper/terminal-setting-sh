import React, { useEffect } from "react";
import "../styles/pages/Main.scss";

const Main = () => {
  useEffect(() => {
    console.log("main");
  }, []);

  return <div className="mainContainer">hi</div>;
};

export default Main;
