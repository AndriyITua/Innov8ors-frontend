import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import * as Yup from "yup";
import css from "./DailyNormaModal.module.css";
import { dailyRate } from "../../redux/water/operationsDaily.js";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
// };

const validationSchema = Yup.object().shape({
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0")
    .max(300, "Weight must be less than 300"),
  activityTime: Yup.number()
    .required("Activity time is required")
    .min(0, "Activity time must be 0 or more")
    .max(24, "Activity time must be less than 24 hours"),
});

const DailyNormaModal = () => {
  const [gender, setGender] = useState("woman");
  const [weight, setWeight] = useState(0);
  const [activityTime, setActivityTime] = useState(0);
  const [waterNorm, setWaterNorm] = useState(0);
  const [plannedWater, setPlannedWater] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const calculateWaterNorm = () => {
    let norm = 0;
    if (gender === "woman") {
      norm = weight * 0.03 + activityTime * 0.4;
    } else {
      norm = weight * 0.04 + activityTime * 0.6;
    }
    setWaterNorm(norm.toFixed(1));
  };

  useEffect(() => {
    calculateWaterNorm();
  }, [weight, activityTime, gender]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("modalClosed", "true");
  };

  useEffect(() => {
    const modalClosed = localStorage.getItem("modalClosed");
    if (modalClosed === "true") {
      setIsVisible(false);
    }
  }, []);

  const validateForm = async () => {
    try {
      setErrors({});

      await validationSchema.validate(
        { weight, activityTime },
        { abortEarly: false }
      );
      return true;
    } catch (validationErrors) {
      const errorObj = {};
      validationErrors.inner.forEach(error => {
        errorObj[error.path] = error.message;
      });
      setErrors(errorObj);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();

    // const validatedActivityTime = activityTime ? parseFloat(activityTime) : 0;

    if (isValid) {
      dispatch(dailyRate(waterNorm));
    }
  };

  if (!isVisible) return null;

  return (
    <div
      // style={customStyles}
      className={css.modalOverlay}
      onClick={handleBackdropClick}
    >
      <div className={css.modalDaily} onClick={e => e.stopPropagation()}>
        <div className={css.modalContent}>
          <h2 className={css.title}>My daily norma</h2>
          <button className={css.clsButton} onClick={handleClose}>
            <CgClose />
          </button>
        </div>
        {/* <div className={styles.formula}> */}
        <p className={css.gender}>
          For woman:
          <span className={css.genderSpan}> V=(M*0,03) + (T*0,4)</span>
        </p>
        <p className={css.gender}>
          For man:
          <span className={css.genderSpan}> V=(M*0,04) + (T*0,6)</span>
        </p>
        {/* </div> */}
        <p className={css.description}>
          <span className={css.genderSpan}>*</span> V is the volume of the water
          norm in liters per day, M is your body weight, T is the time of active
          sports, or another type of activity commensurate in terms of loads (in
          the absence of these, you must set 0)
        </p>

        <form className={css.form}>
          <h3 className={css.rate}>Calculate your rate:</h3>
          <div className={css.radioGroup}>
            <label className={css.radioBtn}>
              <input
                type="radio"
                value="woman"
                checked={gender === "woman"}
                onChange={() => setGender("woman")}
              />
              <span className={css.radioText}>For woman</span>
            </label>
            <label className={css.radioBtn}>
              <input
                type="radio"
                value="man"
                checked={gender === "man"}
                onChange={() => setGender("man")}
              />
              <span className={css.radioText}>For man</span>
            </label>
          </div>

          <div className={css.wrap}>
            <label className={css.label}>Your weight in kilograms:</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              min="0"
              max="200"
              className={css.inputNumber}
            />
            {errors.weight && <div className={css.error}>{errors.weight}</div>}
          </div>

          <div className={css.wrap}>
            <label className={css.label}>
              The time of active participation in sports or other activities
              with a high physical. load in hours:
            </label>
            <input
              type="number"
              value={activityTime}
              onChange={e => setActivityTime(e.target.value)}
              min="0"
              max="24"
              className={css.inputNumber}
            />
            {errors.activityTime && (
              <div className={css.error}>{errors.activityTime}</div>
            )}
          </div>

          <div className={css.wrapLitres}>
            <p className={css.amount}>
              The required amount of water in liters per day:
            </p>
            <p className={css.litres}>
              <span className={css.litresSpan}>{waterNorm} L</span>
            </p>
          </div>

          <div className={css.resultWrap}>
            <p className={css.result}>
              Write down how much water you will drink:
            </p>
            <input
              type="number"
              value={plannedWater}
              onChange={e => setPlannedWater(e.target.value)}
              min="0"
              max="5"
              className={css.inputNumber}
            />
          </div>
          <button className={css.saveBtn} onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyNormaModal;
