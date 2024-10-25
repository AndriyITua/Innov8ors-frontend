import Modal from "react-modal";
import { CgClose } from "react-icons/cg";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
import css from "./DailyNormaModal.module.css";

const customStyles = {
  content: {
    width: "280px",
    height: "auto",
    padding: "24px 12px",
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
  // const dispatch = useDispatch();

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // result =
  //   formik.values.gender === "woman"
  //     ? (weight * 0.03 + time * 0.4).toFixed(1)
  //     : (weight * 0.04 + time * 0.6).toFixed(1);

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
          {/* <span>&times;</span> */}
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
              <span className={css.litresSpan}>1.5 L</span>
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

          <button
            type="submit"
            // disabled={isLoading}
            className={css.saveBtn}
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
}
