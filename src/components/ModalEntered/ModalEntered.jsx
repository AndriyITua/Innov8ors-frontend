import { useState, useEffect, useRef } from "react";
import css from "./ModalEntered.module.css";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Loader from "../Loader/Loader.jsx";
import Glasses from "../../assets/icons/Glasses.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterRecords } from "../../redux/water/selectors.js";
import { featchWater, patchWater } from "../../redux/water/opertionsEditWater.js";

const ADD_WATER = 50;
const WATER_MAX_LIMIT = 5000;

export default function ModalAddWater({ isOpen, onClose, idRecord}) {
  const dispatch = useDispatch();
  const waterRecords = useSelector(selectWaterRecords);

  const record = waterRecords.find((rec) => rec._id === idRecord)

  const [water, setWater] = useState(record?.amount || 50);
  const [disableButtonPluse, setDisableButtonPluse] = useState(false);
  const [disableButtonMinuse, setDisableButtonMinuse] = useState(false);
  const [disableButtonSave, setDisableButtonSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const backdropRef = useRef(null);

  useEffect(() => {
    setWater(record?.amount || 50);
    setLocalTime(record?.createdAt || "");
  }, [idRecord, record]);

  const onPlusClickedHandler = () => {
    const newWaterAmount = water + ADD_WATER;
    setWater(newWaterAmount);
  };

  const onMinusClickedHandler = () => {
    const newWaterAmount = water - ADD_WATER;
    setWater(newWaterAmount);
  };

  // const time = new Date();
  // const hours = time.getHours();
  // const minutes = time.getMinutes();
  // const formattedTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;

  const [localTime, setLocalTime] = useState(record?.createdAt || "");

  const handleTimeChange = event => {
    const inputTime = event.target.value;
    const [hours, minutes] = inputTime.split(':').map(Number);
    
    // Створіть новий об'єкт Date з вибраним часом
    const now = new Date();
    now.setHours(hours, minutes, 0);
  const formattedTime = now.toISOString()
    console.log("Formatted Time:", formattedTime);
    setLocalTime(formattedTime);
    // setLocalTime(event.target.value);
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
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

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
    setLoading(true);
    dispatch(patchWater({ id: idRecord, data: { amount: water}}))
    dispatch(featchWater())
    setLoading(false);
    onClose();

  };
  // , createdAt: localTime 
  const formatTime = isoString => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",});
  };

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
            <h2>Edit the entered amount of water</h2>
            <button className={css.button} onClick={onClose}>
              <IoCloseOutline className={css.buttonClose} />
            </button>
          </div>
          <div className={css.modalContent}>
            <div>
              <ul className={css.item}>
                <div className={css.classesContainer}>
                  <Glasses />
                </div>
                <div className={css.time}>
                  <li className={css.water}>{water} ml</li>
                  <li className={css.am}>{formatTime(localTime)} PM</li>
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
              <p className={css.p}>Recording time:</p>
              <input
                type="time"
                value={formatTime(localTime)}
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
