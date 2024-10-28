import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./DaysGeneralStats.module.css";
import {
  selectDailyRate,
  selectWaterPercentage,
  selectServingsCount,
} from "../../redux/water/selectors.js";

export const DaysGeneralStats = ({
  selectedDay,
  position,
  onShow,
  onClose,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const dailyNorm = useSelector(selectDailyRate);
  const waterPerc = useSelector(selectWaterPercentage);
  const servingsCount = useSelector(selectServingsCount);
  const { date, month } = selectedDay;

  useEffect(() => {
    if (onShow) {
      const { year } = selectedDay;
    }
  }, [dispatch, onShow, selectedDay]);

  useEffect(() => {}, [dailyNorm, waterPerc, servingsCount]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = `${date}, ${monthNames[month]}`;

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleKeyDown = event => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!modalRef.current || !position) return;

    const { top = 0, left = 0, width = 0 } = position;
    const modal = modalRef.current;
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;
    const isMobileScreen = window.innerWidth >= 320 && window.innerWidth < 768;

    let leftDirectin = 0;
    let rightDirection = 0;

    if (isMobileScreen) {
      const adjustedTop = Math.max(0, top - modalHeight);
      modal.style.top = `${adjustedTop}px`;
      modal.style.transform = `translateX(0)`;
    } else {
      leftDirectin = left;
      rightDirection = window.innerWidth - left - width;
    }

    if (leftDirectin > modalWidth) {
      modal.style.left = `${left - modalWidth}px`;
    } else if (rightDirection > modalWidth) {
      modal.style.left = `${left + width}px`;
    } else if (rightDirection < 0) {
      modal.style.left = `${window.innerWidth - modalWidth}px`;
    } else {
      modal.style.left = "50%";
      modal.style.transform = "translateX(-50%)";
    }

    modal.style.top = `${top - modalHeight}px`;
  }, [position]);

  return (
    <div
      ref={modalRef}
      className={styles.modalCalendar}
      style={{ visibility: onShow ? "visible" : "hidden" }}
    >
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className={styles.date}>{formattedDate}</p>
        </li>
        <li className={styles.item}>
          Daily norma:{" "}
          <span className={styles.info}>{selectedDay.dailyNorm} L</span>
        </li>
        <li className={styles.item}>
          Fulfillment of the daily norm:
          <span className={styles.info}>{selectedDay.waterPerc}%</span>
        </li>
        <li className={styles.item}>
          How many servings of water:
          <span className={styles.info}>
            {selectedDay.consumptionCount || 0}
          </span>
        </li>
      </ul>
    </div>
  );
};
