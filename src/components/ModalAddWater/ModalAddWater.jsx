import { useState } from "react";
import css from "./ModalAddWater.module.css";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Loader from "../Loader/Loader.jsx";

const ADD_WATER = 50;
const WATER_MAX_LIMIT = 5000;

export default function ModalAddWater({ isOpen, onClose }) {
  const [water, setWater] = useState(50);
  const [disableButtonPluse, setDisableButtonPluse] = useState(false);
  const [disableButtonMinuse, setDisableButtonMinuse] = useState(false);
  const [disableButtonSave, setDisableButtonSave] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPlusClickedHandler = () => {
    const newWaterAmount = water + ADD_WATER;
    if (newWaterAmount > WATER_MAX_LIMIT) {
      setDisableButtonPluse(true);
    } else {
      setWater(newWaterAmount);
    }
  };

  const onMinusClickedHandler = () => {
    const newWaterAmount = water - ADD_WATER;
    if (newWaterAmount < 0) {
      setDisableButtonMinuse(true);
    } else {
      setWater(newWaterAmount);
    }
  };

  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  const [localTime, setLocalTime] = useState(formattedTime);

  const handleTimeChange = event => {
    setLocalTime(event.target.value);
  };

  const handleWaterChange = event => {
    const newWaterAmount = parseInt(event.target.value, 10);
    if (!isNaN(newWaterAmount)) {
      if (newWaterAmount > WATER_MAX_LIMIT || newWaterAmount < 0) {
        setDisableButtonPluse(true);
        setDisableButtonMinuse(true);
      } else {
        setDisableButtonPluse(false);
        setDisableButtonMinuse(false);
        setDisableButtonSave(false);
        setWater(newWaterAmount);
      }
    } else {
      setWater("");
    }
  };

  const handleSave = () => {
    console.log("На сервер:", { water, localTime });
    setLoading(true);
    if (water > WATER_MAX_LIMIT || water <= 0) {
      setDisableButtonSave(true);
    } else {
      setDisableButtonSave(false);
    }
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className={css.container}>
      {loading ? (
        <div className={css.forLoder}>
          <Loader />
        </div>
      ) : (
        <div className={css.modalWrap}>
          <div className={css.title}>
            <h2>Add water</h2>
            <button onClick={onClose}>
              <IoCloseOutline className={css.buttonClose} />
            </button>
          </div>
          <div className={css.modalContent}>
            <div>
              <h3>Choose a value:</h3>
              <p>Amount of water:</p>
              <div className={css.addWater}>
                <button
                  className={css.circle}
                  onClick={onMinusClickedHandler}
                  disabled={disableButtonMinuse}
                >
                  <FiMinus className={css.circleButton} />
                </button>
                <div className={css.waterMl}>50ml</div>
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
              <p>Recording time:</p>
              <input
                type="text"
                value={localTime}
                onChange={handleTimeChange}
              />
            </div>

            <div>
              <h3>Enter the value of the water used:</h3>
              <input type="text" value={water} onChange={handleWaterChange} />
            </div>

            <div className={css.boxButton}>
              <p className={css.infoWater}>{water}ml</p>
              <button
                className={css.buttonSave}
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
