import { useState, useEffect } from "react";
import css from "./ModalEntered.module.css";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Loader from "../Loader/Loader.jsx";
import Glasses from "../../assets/icons/Glasses.jsx"

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

  const handleSave = () => {
    console.log("На сервер:", { water, localTime });
    setLoading(true);

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
            <h2>Edit the entered amount of water</h2>
            <button className={css.button} onClick={onClose}>
              <IoCloseOutline className={css.buttonClose} />
            </button>
          </div>
          <div className={css.modalContent}>
            <div>
                <ul className={css.item}>
                   <div className={css.classesContainer}><Glasses/></div>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                </ul>
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
                <div className={css.waterMl}>200ml</div>
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
              <p className={css.infoWater}>200ml</p>
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