import { useState, useEffect, useRef } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { DaysGeneralStats } from "../DaysGeneralStats/DaysGeneralStats";
import styles from "./MonthStatsTable.module.css";

const MonthStatsTable = () => {
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const modalRef = useRef(null);

  useEffect(() => {
    generateDays(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  const generateDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (v, i) => ({
      date: i + 1,
      month: month,
      year: year,
      progress: Math.floor(Math.random() * 101),
    }));
    setDays(daysArray);
  };

  const handleSelectDay = (day, event) => {
    setSelectedDay(day);
    const rect = event.target.getBoundingClientRect();
    setModalPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const goNextMonth = () => {
    const today = new Date();
    if (currentYear === today.getFullYear() && currentMonth >= today.getMonth())
      return;

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalRef]);

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  return (
    <div className={styles.monthContainer}>
      <div className={styles.calendarContainer}>
        <div className={styles.monthNavigation}>
          <h2 className={styles.monthTitle}>Month</h2>
          <div className={styles.monthControl}>
            <button className={styles.arrowButton} onClick={goPrevMonth}>
              <MdArrowBackIos style={{ fontSize: "14px" }} />
            </button>
            <span className={styles.spanInfo}>
              {`${new Date(currentYear, currentMonth).toLocaleString("en-US", {
                month: "long",
              })}, ${currentYear}`}
            </span>
            <button
              className={`${styles.arrowButton} ${
                currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth()
                  ? styles.disabledArrow
                  : ""
              }`}
              onClick={goNextMonth}
              disabled={
                currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth()
              }
            >
              <MdArrowForwardIos style={{ fontSize: "14px" }} />
            </button>
          </div>
        </div>
        <div>
          <ul className={styles.daysContainer}>
            {days.map(day => (
              <li className={styles.dayCell} key={day.date}>
                <div
                  className={`${styles.dayItem} ${
                    day.progress < 100 ? styles.incomplete : styles.completed
                  }`}
                  onClick={e =>
                    handleSelectDay({ ...day, waterPerc: day.progress }, e)
                  }
                >
                  <div className={styles.dayDate}>{day.date}</div>
                </div>
                <div className={styles.dayProgress}>{`${day.progress}%`}</div>
              </li>
            ))}
          </ul>
        </div>
        {selectedDay && (
          <DaysGeneralStats
            selectedDay={selectedDay}
            position={modalPosition}
            onShow={Boolean(selectedDay)}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default MonthStatsTable;
