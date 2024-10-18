import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./TryTrackerButton.module.css";

const TryTrackerButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <button onClick={handleClick} className={css.welcomeTryBtn}>
      Try tracker
    </button>
  );
};

export default TryTrackerButton;
