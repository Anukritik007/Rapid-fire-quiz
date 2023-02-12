import React from "react";
import "./Button.css";

const Button = ({ name, handleClick, isActive, isDisabled }) => {
  return (
    <button
      className={isActive ? "button selected" : "button"}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
};

export default Button;
