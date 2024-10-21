// import React from "react";
// import ReactDOM from "react-dom";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
import css from "../DailyNormaModal/DailyNormaModal.module.css";

const customStyles = {
  content: {
    width: "280px",
    // height: "auto",
    padding: "24px 12px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    // overflow: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
};

export default function DailyNormaModal({ modalIsOpen, closeModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className={css.modalContent}>
        <h2 className={css.title}>My daily norma</h2>
        <button className={css.clsButton} onClick={closeModal}>
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
              <input type="radio" name="gender" value="woman" checked /> For
              woman
            </label>
            <label>
              <input type="radio" name="gender" value="man" /> For man
            </label>
          </div>
          <div className={css.wrap}>
            <label htmlFor="weight">Your weight in kilograms:</label>
            <input
              type="number"
              id="weight"
              value="0"
              className={css.inputNumber}
            ></input>
          </div>
          <div className={css.wrap}>
            <label htmlFor="hours" className={css.label}>
              The time of active participation in sports or other activities
              with high physical load in hours:
            </label>
            <input
              type="number"
              id="hours"
              value="0"
              className={css.inputNumber}
            ></input>
          </div>
          <div className={css.wrapLitres}>
            <p className={css.amount}>
              The required amount of water in liters per day:
            </p>
            <p className={css.litres}>
              <span className={css.litresSpan}>1.8 L</span>
            </p>
          </div>
          <div className={css.resultWrap}>
            <label htmlFor="water" className={css.result}>
              Write down how much water you will drink:
            </label>
            <input
              type="number"
              id="water"
              value="0"
              className={css.inputNumber}
            ></input>
          </div>
          <button type="submit" className={css.saveBtn}>
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
