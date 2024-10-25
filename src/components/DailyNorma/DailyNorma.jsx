import { useState } from "react";
import Modal from "react-modal";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "../DailyNorma/DailyNorma.module.css";

Modal.setAppElement("#root");

export default function DailyNorma() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    document.body.classList.add("modal-open");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={css.div}>
        <h4 className={css.title}>My daily norma</h4>
        <p className={css.litres}>1.5 L</p>
        <button className={css.buttonDaily} onClick={openModal}>
          Edit
        </button>
      </div>
      <DailyNormaModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </>
  );
}
