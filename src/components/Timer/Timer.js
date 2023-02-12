import React from "react";
import "./Timer.css";

const Timer = ({ remainingTime }) => {
  return <div className="timer">{remainingTime}</div>;
};

export default Timer;
