import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
// import * as Yup from "yup";
import {
  useState,
  // useEffect
} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useFormik } from "formik";
// import toast from "react-hot-toast";
import css from "./DailyNormaModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

export default function DailyNormaModal({ modalIsOpen, closeModal }) {
  // const dispatch = useDispatch();
  // const [calculatedNorma, setCalculatedNorma] = useState(0);
  const [
    isLoading,
    // setIsLoading
  ] = useState(false);
  // const gender = useSelector(selectGender);
  // const dailyNorma = useSelector(selectDailyNorma);
  // const [selectedGender, setSelectedGender] = useState(gender);

  // const calculateSchema = Yup.object({
  //   weight: Yup.number()
  //     .typeError("Weight must be a number")
  //     .positive()
  //     .min(20, "Minimum value is 20kg")
  //     .max(300, "Maximum value is 300kg")
  //     .required("Weight is required"),
  //   time: Yup.number()
  //     .typeError("Time must be a number")
  //     .positive()
  //     .min(0.1, "Minimum value is 0.1h")
  //     .max(24, "Maximum value is 24h")
  //     .required("Time is required"),
  //   amountOfWater: Yup.number()
  //     .typeError("Water amount must be a number")
  //     .min(0.1, "Minimum value is 0.1L")
  //     .max(15, "Maximum value is 15L")
  //     .required("Water amount is required"),
  // });

  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   const currentDay = String(currentDate.getDate()).padStart(2, "0");
  //   const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  //   const currentYear = currentDate.getFullYear();
  //   return `${currentDay}-${currentMonth}-${currentYear}`;
  // };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // useEffect(() => {
  //   const handleEsc = e => {
  //     if (e.code === "Escape") {
  //       closeModal();
  //     }
  //   };
  //   window.addEventListener("keydown", handleEsc);
  //   return () => {
  //     window.removeEventListener("keydown", handleEsc);
  //   };
  // }, [closeModal]);

  // const formik = useFormik({
  //   initialValues: {
  //     gender: selectedGender,
  //     weight: dailyNorma?.weight || "",
  //     time: dailyNorma?.time || "",
  //     amountOfWater: dailyNorma?.dailyNormaLiters || "",
  //   },
  //   validationSchema: calculateSchema,

  //   onSubmit: async values => {
  //     setIsLoading(true);
  //     try {
  //       const dailyNormaLiters = Number(values.amountOfWater);
  //       const dailyNormaMl = dailyNormaLiters * 1000;

  //       const newDailyNorma = { dailyNorma: dailyNormaMl };
  //       const currentDate = getCurrentDate();

  //       dispatch(changeDailyNorma(newDailyNorma));

  //       dispatch(updateWaterRateThunk(newDailyNorma));
  //       dispatch(fetchMonthlyPortionsThunk(currentDate));

  //       toast.success("Data saved successfully!");
  //       closeModal();
  //     } catch (error) {
  //       error("An error occurred while saving data!");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  // });

  // const handleGenderChange = e => {
  //   setSelectedGender(e.target.value);
  //   formik.setFieldValue("gender", e.target.value);
  // };

  // useEffect(() => {
  //   const weight = Math.floor(formik.values.weight);
  //   const time = Math.floor(formik.values.time);
  //   let result;

  //   if (isNaN(weight) || isNaN(time) || weight <= 0) {
  //     result = calculatedNorma;
  //   } else {
  //     result =
  //       formik.values.gender === "woman"
  //         ? (weight * 0.03 + time * 0.4).toFixed(1)
  //         : (weight * 0.04 + time * 0.6).toFixed(1);
  //   }
  //   setCalculatedNorma(result);
  // }, [
  //   calculatedNorma,
  //   formik.values.gender,
  //   formik.values.time,
  //   formik.values.weight,
  // ]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
      className={css.modalDaily}
      onClick={handleBackdropClick}
    >
      <div className={css.modalContent}>
        <h2 className={css.title}>My daily norma</h2>
        <button className={css.clsButton} onClick={closeModal}>
          <span>&times;</span>
          <CgClose />
        </button>
        <p className={css.gender}>
          For woman:{" "}
          <span className={css.genderSpan}>V=(M*0,03) + (T*0,4)</span>
        </p>
        <p className={css.gender}>
          For man: <span className={css.genderSpan}>V=(M*0,04) + (T*0,6)</span>
        </p>
        <p className={css.description}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>

        <form className={css.form}>
          <div>
            <legend className={css.rate}>Calculate your rate:</legend>
            <label className={css.radioBtn}>
              <input
                type="radio"
                name="gender"
                value="woman"
                // checked={selectedGender === "woman"}
                // onChange={handleGenderChange}
              />{" "}
              For woman
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="man"
                // checked={selectedGender === "man"}
                // onChange={handleGenderChange}
              />{" "}
              For man
            </label>
          </div>

          <div className={css.wrap}>
            <label htmlFor="weight">
              Your weight in kilograms:
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                max="200"
                // onChange={}
                // value={}
                placeholder="0"
                className={css.inputNumber}
              ></input>
              {/* {formik.touched.weight && formik.errors.weight ? (
                <div className={css.error}>{formik.errors.weight}</div>
              ) : null} */}
            </label>
          </div>

          <div className={css.wrap}>
            <label htmlFor="hours" className={css.label}>
              The time of active participation in sports or other activities
              with high physical load in hours:
            </label>
            <input
              type="number"
              id="hours"
              name="time"
              min="0"
              max="24"
              // onChange={}
              // value={}
              placeholder="0"
              className={css.inputNumber}
            ></input>
          </div>

          <div className={css.wrapLitres}>
            <p className={css.amount}>
              The required amount of water in liters per day:
            </p>
            <p className={css.litres}>
              {/* <span className={css.litresSpan}>{calculatedNorma}</span> */}
            </p>
          </div>

          <div className={css.resultWrap}>
            <label htmlFor="water" className={css.result}>
              Write down how much water you will drink:
            </label>
            <input
              type="number"
              id="water"
              name="amountOfWater"
              min="0"
              max="5"
              // onChange={}
              // value={}
              placeholder="0"
              className={css.inputNumber}
            ></input>
          </div>

          <button type="submit" disabled={isLoading} className={css.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
