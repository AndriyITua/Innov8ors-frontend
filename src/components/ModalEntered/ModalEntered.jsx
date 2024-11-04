import { useState, useEffect, useRef } from "react";
import css from "./ModalEntered.module.css";
import { IoCloseOutline, IoAddOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import Loader from "../Loader/Loader.jsx";
import Glasses from "../../assets/icons/Glasses.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectWaterRecords } from "../../redux/water/selectors.js";
import {
  featchWater,
  patchWater,
} from "../../redux/water/opertionsEditWater.js";

const ADD_WATER = 50;
const WATER_MAX_LIMIT = 5000;

export default function ModalAddWater({
  isOpen,
  onClose,
  idRecord,
  updateCalender,
}) {
  const dispatch = useDispatch();
  const waterRecords = useSelector(selectWaterRecords);
  const record = waterRecords.find(rec => rec._id === idRecord);

  const [water, setWater] = useState(record?.amount || 50);
  const [localTime, setLocalTime] = useState(record?.consumptionTime || "");
  const [disableButtonPluse, setDisableButtonPluse] = useState(false);
  const [disableButtonMinuse, setDisableButtonMinuse] = useState(false);
  const [disableButtonSave, setDisableButtonSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waterInput, setWaterInput] = useState(record?.amount || 50);
  const [localTiInput, setLocalTimeInput] = useState("");

  const backdropRef = useRef(null);
  const convertTo24HourFormat = time => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    if (record) {
      setWater(record.amount || 50);
      setWaterInput(record.amount);
      const time = convertTo24HourFormat(record.consumptionTime) || "";
      setLocalTime(time);
      setLocalTimeInput(time);
    }
  }, [idRecord, record]);

  const onPlusClickedHandler = () => {
    const newWaterAmount = waterInput + ADD_WATER;
    setWaterInput(newWaterAmount);
  };

  const onMinusClickedHandler = () => {
    const newWaterAmount = waterInput - ADD_WATER;
    setWaterInput(newWaterAmount);
  };

  useEffect(() => {
    setDisableButtonPluse(waterInput >= WATER_MAX_LIMIT);
    setDisableButtonMinuse(waterInput <= 0);
    setDisableButtonSave(waterInput > WATER_MAX_LIMIT || water <= 0);
  }, [waterInput]);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const hourString = hour.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        times.push(`${hourString}:${minuteString}`);
      }
    }
    return times;
  };
  const timeOptions = generateTimeOptions();

  const handleTimeChange = event => {
    setLocalTimeInput(event.target.value);
  };

  const handleWaterChange = event => {
    const newWaterAmount = parseInt(event.target.value, 10);
    if (!isNaN(newWaterAmount)) {
      setWaterInput(newWaterAmount);
    } else {
      setWaterInput("");
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

  const handleSave = async () => {
    setLoading(true);
    const [hour, minute] = localTiInput.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const adjustedHour = hourInt % 12 || 12;
    const formattedLocalTime = `${adjustedHour}:${minute} ${period}`;

    await dispatch(
      patchWater({
        id: idRecord,
        data: { amount: waterInput, consumptionTime: formattedLocalTime },
      })
    );
    setTimeout(() => {
      setLoading(false);
      dispatch(featchWater());
      onClose();
    }, 1500);
    updateCalender();
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
                  <li className={css.am}>{localTime}</li>
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
                <div className={css.waterMl}>{waterInput}ml</div>
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
                value={localTiInput}
                onChange={handleTimeChange}
                className={css.input}
                list="time-options"
              />
              <datalist id="time-options">
                {timeOptions.map(time => (
                  <option key={time} value={time} />
                ))}
              </datalist>
            </div>

            <div>
              <h3 className={css.h3}>Enter the value of the water used:</h3>
              <input
                type="text"
                value={waterInput}
                onChange={handleWaterChange}
                className={css.input}
              />
            </div>

            <div className={css.boxButton}>
              <p className={css.infoWater}>{waterInput}ml</p>
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
