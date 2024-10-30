import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "./DailyNormaModal.module.css";
import { putWaterRate } from "../../redux/water/operationsDaily";
import toast from "react-hot-toast";
import { selectDailyRate } from "../../redux/water/selectors";

const customStyles = {
  content: {
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    overflow: "auto",
    backgroundColor: "#ffffff",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

const validationSchema = Yup.object().shape({
  weight: Yup.number().min(0, "Weight must be above 0"),
  hours: Yup.number()
    .min(0, "Hours cant be negative")
    .max(24, "Maximum 24 hour"),
  water: Yup.number().min(1, "Water must be above 0"),
});

export default function DailyNormaModal({ modalIsOpen, closeModal }) {
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState("woman");
  const [waterAmount, setWaterAmount] = useState(0);
  const dailyRate = useSelector(selectDailyRate);

  const calculateWater = (weight, hours, gender) => {
    if (gender === "woman") {
      return weight * 0.03 + hours * 0.4;
    }
    if (gender === "man") {
      return weight * 0.04 + hours * 0.6;
    }
    return 2;
  };

  const handleGenderChange = e => {
    setSelectedGender(e.target.value);
  };

  const handleModalClose = () => {
    closeModal();
    setWaterAmount(0);
  };

  const updateDailyNorma = async values => {
    const waterValue = values.water || waterAmount;

    if (waterValue === 0) return;
    try {
      const response = await dispatch(putWaterRate(waterValue * 1000));

      if (putWaterRate.rejected.match(response)) {
        throw new Error(response.payload);
      }
      handleModalClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      contentLabel="Daily Water Norm Modal"
      style={customStyles}
      className={css.modalDaily}
      onClick={e => {
        if (e.target === e.currentTarget) handleModalClose();
      }}
    >
      <div className={css.modalContent}>
        <div className={css.modalHeader}>
          <h2 className={css.title}>My daily norma</h2>
          <button className={css.clsButton} onClick={handleModalClose}>
            <CgClose className={css.svg} />
          </button>
        </div>
        <p className={css.gender}>
          For woman:{" "}
          <span className={css.genderSpan}>V=(M*0.03) + (T*0.4)</span>
        </p>
        <p className={css.gender}>
          For man: <span className={css.genderSpan}>V=(M*0.04) + (T*0.6)</span>
        </p>
        <p className={css.description}>
          * V is the volume of the water norm in liters per day, M is your body
          weight, T is the time of active sports, or another type of activity
          commensurate in terms of loads (in the absence of these, you must set
          0)
        </p>

        <Formik
          initialValues={{
            weight: "",
            hours: "",
          }}
          validationSchema={validationSchema}
          onSubmit={updateDailyNorma}
        >
          {({ values }) => {
            const newWaterAmount = calculateWater(
              values.weight,
              values.hours,
              selectedGender
            );
            if (newWaterAmount !== waterAmount) {
              setWaterAmount(newWaterAmount);
            }
            return (
              <Form className={css.form}>
                <div>
                  <legend className={css.rate}>Calculate your rate:</legend>
                  <label className={css.radioBtn}>
                    <Field
                      type="radio"
                      name="gender"
                      value="woman"
                      checked={selectedGender === "woman"}
                      onChange={handleGenderChange}
                    />
                    For woman
                  </label>
                  <label className={css.radioBtn}>
                    <Field
                      type="radio"
                      name="gender"
                      value="man"
                      checked={selectedGender === "man"}
                      onChange={handleGenderChange}
                    />
                    For man
                  </label>
                </div>

                <div className={css.wrap}>
                  <label htmlFor="weight" className={css.label}>
                    Your weight in kilograms:
                    <Field
                      type="number"
                      id="weight"
                      name="weight"
                      placeholder="0"
                      className={css.inputNumber}
                    />
                    <ErrorMessage
                      className={css.error}
                      name="weight"
                      component="div"
                    />
                  </label>
                </div>
                <div className={css.wrapHours}>
                  <label htmlFor="hours" className={css.label}>
                    <p>
                      {" "}
                      The time of active participation in sports or other
                      activities with high physical load in hours:
                    </p>

                    <Field
                      type="number"
                      id="hours"
                      name="hours"
                      placeholder="0"
                      className={css.inputNumber}
                    />
                    <ErrorMessage
                      className={css.error}
                      name="hours"
                      component="div"
                    />
                  </label>
                </div>
                <div className={css.wrapLitres}>
                  <p className={css.amount}>
                    The required amount of water in liters per day:
                  </p>
                  <p className={css.litres}>
                    <span className={css.litresSpan}>
                      {waterAmount.toFixed(1)} L
                    </span>
                  </p>
                </div>

                <div className={css.resultWrap}>
                  <label htmlFor="water" className={css.result}>
                    <p> Write down how much water you will drink:</p>
                  </label>
                  <Field
                    type="text"
                    id="water"
                    name="water"
                    // placeholder={waterAmount.toFixed(1)}
                    placeholder={
                      waterAmount
                        ? waterAmount.toFixed(1)
                        : (dailyRate / 1000).toFixed(1)
                    }
                    className={css.waterInput}
                  />
                  <ErrorMessage
                    className={css.error}
                    name="water"
                    component="div"
                  />
                </div>

                <button
                  type="submit"
                  // className={`${css.saveBtn} ${
                  //   waterAmount === 0 ? css.unactive : ""
                  // }`}
                  className={css.saveBtn}
                  // disabled={waterAmount === 0}
                >
                  Save
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
