import SettingModal from "../../SettingModal/SettingModal";
import css from "./HeaderModal.module.css";
import { useState } from "react";

const HeaderModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false); //стейт для статуса модалки

  // фyнкции для модалки
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <header className={css.bar}>
      <button className={css.button} onClick={openModal}>
        Settings
      </button>
      <SettingModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </header>
  );
};

export default HeaderModal;
