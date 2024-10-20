import css from "../DailyNorma/DailyNorma.module.css";
import { useState } from "react";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function DailyNorma() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={css.div}>
        <p className={css.title}>My daily norma</p>
        <p className={css.litres}>1.5 L</p>
        <button className={css.button} onClick={openModal}>
          Edit
        </button>
      </div>
      <DailyNormaModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}
