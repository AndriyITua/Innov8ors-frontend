import { useState, useEffect, useRef } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { DaysGeneralStats } from "../DaysGeneralStats/DaysGeneralStats";
import {
  // selectWaterPercentage,
  // selectWaterRecords,
  selectWaterInfo,
} from "../../redux/water/selectors.js";
import styles from "./MonthStatsTable.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchWaterMonth } from "../../redux/water/operationsMonth.js";

const MonthStatsTable = () => {
  const waterInfo = useSelector(selectWaterInfo);

  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalPosition, setModalPosition] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchWaterMonth({
        year: currentYear,
        month: currentMonth,
      })
    );
  }, [currentYear, currentMonth, dispatch]);

  useEffect(() => {
    if (!waterInfo[0]?.date) return;
    generateDays(currentYear, currentMonth, waterInfo);
  }, [currentYear, currentMonth, waterInfo]);

  const generateDays = (year, month, waterInfo = []) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const waterInfoByDate = waterInfo.reduce((acc, record) => {
      const day = parseInt(record.date.split(",")[0], 10);

      acc[day] = record;
      return acc;
    }, {});

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const waterInfo = waterInfoByDate[day] || {};

      return {
        date: day,
        month: month,
        year,
        progress: waterInfo.percentage || 0,
        consumptionCount: waterInfo.consumptionCount || 0,
      };
    });

    setDays(daysArray);
  };

  const handleSelectDay = (day, event) => {
    setSelectedDay({
      ...day,
      year: currentYear,
      waterPerc: day.progress,
      consumptionCount: day.consumptionCount,
    });

    const mobileScreen = window.innerWidth >= 320 && window.innerWidth < 768;
    const tabletScreen = window.innerWidth >= 768 && window.innerWidth < 1440;
    const desktopScreen = window.innerWidth >= 1440;

    const rect = event.target.getBoundingClientRect();

    if (desktopScreen) {
      if (
        (day.date > 0 && day.date < 5) ||
        (day.date > 10 && day.date < 15) ||
        (day.date > 20 && day.date < 25) ||
        day.date > 30
      ) {
        setModalPosition({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX + 48,
          width: rect.width,
        });
      } else if (
        (day.date > 4 && day.date < 11) ||
        (day.date > 14 && day.date < 21) ||
        (day.date > 24 && day.date < 31)
      ) {
        setModalPosition({
          top: rect.top + window.scrollY - 8,
          left: rect.left + window.scrollX - 236,
          width: rect.width,
        });
      }
    }
    if (tabletScreen) {
      if (
        (day.date > 0 && day.date < 5) ||
        (day.date > 10 && day.date < 15) ||
        (day.date > 20 && day.date < 25) ||
        day.date > 30
      ) {
        setModalPosition({
          top: rect.top + window.scrollY - 2,
          left: rect.left + window.scrollX - 18,
          width: rect.width,
        });
      } else if (
        (day.date > 4 && day.date < 11) ||
        (day.date > 14 && day.date < 21) ||
        (day.date > 24 && day.date < 31)
      ) {
        setModalPosition({
          top: rect.top + window.scrollY - 2,
          left: rect.left + window.scrollX + 20,
          width: rect.width,
        });
      }
    }
    if (mobileScreen) {
      setModalPosition({
        top: rect.top + window.scrollY - 2,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const goPrevMonth = () => {
    const newMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const newYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    dispatch(fetchWaterMonth({ year: newYear, month: newMonth }));
  };

  const goNextMonth = () => {
    const newMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const newYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    dispatch(fetchWaterMonth({ year: newYear, month: newMonth }));
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
              {`${new Date(currentYear, currentMonth - 1).toLocaleString(
                "en-US",
                {
                  month: "long",
                }
              )}, ${currentYear}`}
            </span>
            <button
              className={`${styles.arrowButton} ${
                currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth() + 1
                  ? styles.disabledArrow
                  : ""
              }`}
              onClick={goNextMonth}
              disabled={
                currentYear === new Date().getFullYear() &&
                currentMonth === new Date().getMonth() + 1
              }
            >
              <MdArrowForwardIos style={{ fontSize: "14px" }} />
            </button>
          </div>
        </div>
        <div>
          <ul className={styles.daysContainer}>
            {days.map(day => (
              <li
                className={styles.dayCell}
                key={day.date}
                onClick={e => handleSelectDay(day, e)}
              >
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
                <div className={styles.dayProgress}>{`${day.progress}%`}</div>{" "}
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
