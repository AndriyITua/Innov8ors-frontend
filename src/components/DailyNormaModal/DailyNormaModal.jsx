import { useDispatch } from "react-redux";
import { CgClose } from "react-icons/cg";
import css from "./DailyNormaModal.module.css";
import { dailyRate } from "../../redux/water/operationsDaily.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, Toaster } from "react-hot-toast";

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.8)",
//   },
// };

const DailyNormaModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const calculateWaterIntake = (weight, activityTime, gender) => {
    if (!weight || !activityTime) return 1.8;
    const M = Number(weight);
    const T = Number(activityTime);
    let V;
    if (gender === "female") {
      V = M * 0.03 + T * 0.4;
    } else {
      V = M * 0.04 + T * 0.6;
    }
    return V;
  };

  const handleSubmit = async values => {
    const waterAmount =
      parseFloat(
        values.waterIntake ||
          calculateWaterIntake(
            values.weight,
            values.activityTime,
            values.gender
          )
      ) * 1000;
    const result = await dispatch(dailyRate({ dailyNorma: waterAmount }));
    if (dailyRate.fulfilled.match(result)) {
      toast.success("Data saved successfully!");
    } else {
      toast.error(result.payload || "Failed to save data.");
    }
  };

  const handleClose = e => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      // style={customStyles}
      className={css.modalOverlay}
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div className={css.modalDaily} tabIndex="0">
        <div className={css.modalContent}>
          <h2 className={css.title}>My daily norma</h2>
          <button className={css.clsButton} onClick={handleClose}>
            <CgClose />
          </button>
        </div>

        <p className={css.gender}>
          For woman:
          <span className={css.genderSpan}> V=(M*0,03) + (T*0,4)</span>
        </p>
        <p className={css.gender}>
          For man:
          <span className={css.genderSpan}> V=(M*0,04) + (T*0,6)</span>
        </p>
        <p className={css.description}>
          <span className={css.genderSpan}>*</span> V is the volume of the water
          norm in liters per day, M is your body weight, T is the time of active
          sports, or another type of activity commensurate in terms of loads (in
          the absence of these, you must set 0)
        </p>

        <Formik
          initialValues={{
            weight: "",
            activityTime: "",
            gender: "female",
            waterIntake: "",
          }}
          onSubmit={handleSubmit}
          className={css.form}
        >
          {({ values }) => (
            <Form>
              <h3 className={css.rate}>Calculate your rate:</h3>
              <div className={css.radioGroup}>
                <label className={css.radioBtn}>
                  <Field type="radio" name="gender" value="female" />
                  For woman
                </label>
                <label className={css.radioBtn}>
                  <Field type="radio" name="gender" value="male" />
                  For man
                </label>
              </div>

              <div className={css.wrap}>
                <label className={css.label}>Your weight in kilograms:</label>
                <Field
                  name="weight"
                  className={css.inputNumber}
                  placeholder="0"
                  type="text"
                />
                <ErrorMessage name="weight" component="span" />
              </div>

              <div className={css.wrap}>
                <label className={css.label}>
                  The time of active participation in sports or other activities
                  with a high physical. load in hours:
                </label>
                <Field
                  name="activityTime"
                  className={css.inputNumber}
                  placeholder="0"
                  type="text"
                />
                <ErrorMessage name="activityTime" component="span" />
              </div>

              <div className={css.wrapLitres}>
                <p className={css.amount}>
                  The required amount of water in liters per day:
                </p>
                <span className={css.litresSpan}>
                  {calculateWaterIntake(
                    values.weight,
                    values.activityTime,
                    values.gender
                  )}{" "}
                  L
                </span>
              </div>

              <div className={css.resultWrap}>
                <p className={css.result}>
                  Write down how much water you will drink:
                </p>
                <Field
                  name="waterIntake"
                  className={css.inputNumber}
                  placeholder="Water Intake"
                  type="text"
                  value={
                    values.waterIntake ||
                    calculateWaterIntake(
                      values.weight,
                      values.activityTime,
                      values.gender
                    )
                  }
                />
                <ErrorMessage name="waterIntake" component="span" />
              </div>
              <button className={css.saveBtn} onClick={handleSubmit}>
                Save
              </button>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </div>
  );
};

export default DailyNormaModal;
