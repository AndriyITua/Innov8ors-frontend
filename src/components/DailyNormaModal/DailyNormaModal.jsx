import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import css from "./DailyNormaModal.module.css";
import { putWaterRate } from "../../redux/water/operationsDaily";
import toast from "react-hot-toast";
// import { selectDailyRate } from "../../redux/water/selectors";

const customStyles = {
  content: {
    // width: "280px",
    height: "auto",
    // padding: "24px 12px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
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

export default function DailyNormaModal({ modalIsOpen, closeModal }) {
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState("woman");
  const [weight, setWeight] = useState(0);
  const [hours, setHours] = useState(0);
  const [waterAmount, setWaterAmount] = useState(0);

  const calculateWater = () => {
    const weight = document.querySelector("#weight").value;
    const hours = document.querySelector("#hours").value;
    if (document.querySelector("input[name='gender'][value='woman']").checked) {
      return weight * 0.03 + hours * 0.4;
    }
    if (document.querySelector("input[name='gender'][value='man']").checked) {
      return weight * 0.04 + hours * 0.6;
    }
    return 2;
  };

  const handleWeightChange = e => {
    const newWeight = e.target.value;

    setWeight(newWeight);
    setWaterAmount(calculateWater(newWeight, hours));
  };

  const handleHoursChange = e => {
    const newHours = e.target.value;

    setHours(newHours);
    setWaterAmount(calculateWater(weight, newHours));
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const updateDailyNorma = async () => {
    const water = document.querySelector("#water");
    try {
      await dispatch(putWaterRate(water.value * 1000));
      closeModal();
      resetForm;
    } catch (error) {
      toast.error(
        error.message || "An error occurred when updating the water rate."
      );
    }
  };

  const resetForm = () => {
    setWeight(0);
    setHours(0);
    setWaterAmount(0);
  };

  const handleChange = e => {
    setSelectedGender(e.target.value);
  };

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
        <div className={css.modalHeader}>
          <h2 className={css.title}>My daily norma</h2>
          <button className={css.clsButton} onClick={closeModal}>
            <CgClose />
          </button>
        </div>
        <p className={css.gender}>
          For woman:
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
                checked={selectedGender === "woman"}
                onChange={handleChange}
              />
              For woman
            </label>
            <label className={css.radioBtn}>
              <input
                type="radio"
                name="gender"
                value="man"
                checked={selectedGender === "man"}
                onChange={handleChange}
              />{" "}
              For man
            </label>
          </div>

          <div className={css.wrap}>
            <label htmlFor="weight" className={css.kiloHours}>
              Your weight in kilograms:
              <input
                type="text"
                id="weight"
                name="weight"
                min="0"
                max="200"
                onChange={handleWeightChange}
                placeholder="0"
                className={css.inputNumber}
              ></input>
            </label>
          </div>

          <div className={css.wrap}>
            <label htmlFor="hours" className={css.label}>
              The time of active participation in sports or other activities
              with high physical load in hours:
            </label>
            <input
              type="text"
              id="hours"
              name="time"
              min="0"
              max="24"
              onChange={handleHoursChange}
              placeholder="0"
              className={css.inputNumber}
            ></input>
          </div>

          <div className={css.wrapLitres}>
            <p className={css.amount}>
              The required amount of water in liters per day:
            </p>
            <p className={css.litres}>
              <span className={css.litresSpan}>{waterAmount.toFixed(1)} L</span>
            </p>
          </div>

          <div className={css.resultWrap}>
            <label htmlFor="water" className={css.result}>
              Write down how much water you will drink:
            </label>
            <input
              type="text"
              id="water"
              name="amountOfWater"
              min="0"
              max="5"
              placeholder="0"
              className={css.waterInput}
            ></input>
          </div>

          <button
            type="button"
            className={css.saveBtn}
            onClick={updateDailyNorma}
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
