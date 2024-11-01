import { useState, useEffect, useRef } from "react";
import css from "./ModalAddWater.module.css";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Loader from "../Loader/Loader.jsx";
import { useDispatch } from "react-redux";
import { addWater, featchWater } from "../../redux/water/opertionsEditWater.js";

const ADD_WATER = 50;
const WATER_MAX_LIMIT = 5000;

export default function ModalAddWater({ isOpen, onClose, updateCalender }) {
  const dispatch = useDispatch();
  const [water, setWater] = useState(50);
  const [disableButtonPluse, setDisableButtonPluse] = useState(false);
  const [disableButtonMinuse, setDisableButtonMinuse] = useState(false);
  const [disableButtonSave, setDisableButtonSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const backdropRef = useRef(null);

  const onPlusClickedHandler = () => {
    const newWaterAmount = water + ADD_WATER;
    setWater(newWaterAmount);
  };

  const onMinusClickedHandler = () => {
    const newWaterAmount = water - ADD_WATER;
    setWater(newWaterAmount);
  };

  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  const [localTime, setLocalTime] = useState(formattedTime);

  useEffect(() => {}, [localTime]);

  const handleTimeChange = event => {
    setLocalTime(event.target.value);
  };

  const handleWaterChange = event => {
    const newWaterAmount = parseInt(event.target.value, 10);
    if (!isNaN(newWaterAmount)) {
      setWater(newWaterAmount);
    } else {
      setWater("");
    }
  };

  useEffect(() => {
    if (water >= WATER_MAX_LIMIT) {
      setDisableButtonPluse(true);
    } else {
      setDisableButtonPluse(false);
    }

    if (water <= 0) {
      setDisableButtonMinuse(true);
    } else {
      setDisableButtonMinuse(false);
    }

    if (water > WATER_MAX_LIMIT || water <= 0) {
      setDisableButtonSave(true);
    } else {
      setDisableButtonSave(false);
    }
  }, [water]);

  const handleSave = async () => {
    setLoading(true);
    const [hour, minute] = localTime.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const adjustedHour = hourInt % 12 || 12;
    const formattedLocalTime = `${adjustedHour}:${minute} ${period}`;

    await dispatch(
      addWater({ amount: water, consumptionTime: formattedLocalTime })
    );
    await dispatch(featchWater());

    updateCalender();
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 500);
  };
  useEffect(() => {
    const handleEscape = event => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = event => {
      if (backdropRef.current && !backdropRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      setLocalTime(formattedTime);
      setWater(50);
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, formattedTime, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.container}>
      {loading ? (
        <div className={css.forLoder}>
          <Loader />
        </div>
      ) : (
        <div className={css.modalWrap} ref={backdropRef}>
          <div className={css.title}>
            <h2>Add water</h2>
            <button className={css.button} onClick={onClose}>
              <IoCloseOutline className={css.buttonClose} />
            </button>
          </div>
          <div className={css.modalContent}>
            <div>
              <h3 className={css.h3}>Choose a value:</h3>
              <p className={css.p}>Amount of water:</p>
              <div className={css.addWater}>
                <button
                  className={css.circle}
                  onClick={onMinusClickedHandler}
                  disabled={disableButtonMinuse}
                >
                  <FiMinus className={css.circleButton} />
                </button>
                <div className={css.waterMl}>{water}ml</div>
                <button
                  className={css.circle}
                  onClick={onPlusClickedHandler}
                  disabled={disableButtonPluse}
                >
                  <IoAddOutline className={css.circleButton} size={22} />
                </button>
              </div>
            </div>

            <div>
              <p className={css.p}>Recording time:</p>
              <input
                type="text"
                value={localTime}
                onChange={handleTimeChange}
                className={css.input}
              />
            </div>

            <div>
              <h3 className={css.h3}>Enter the value of the water used:</h3>
              <input
                type="text"
                value={water}
                onChange={handleWaterChange}
                className={css.input}
              />
            </div>

            <div className={css.boxButton}>
              <p className={css.infoWater}>{water}ml</p>
              <button
                className={`${css.buttonSave} ${
                  disableButtonSave ? css.buttonDisabled : ""
                }`}
                onClick={handleSave}
                disabled={disableButtonSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
