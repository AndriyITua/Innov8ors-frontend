import Modal from "react-modal";

import css from "./SettingModal.module.css";
import SettingForm from "../SettingForm/SettingForm";

const SettingModal = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <div className={css.card}>
          <SettingForm />
        </div>
      </Modal>
    </div>
  );
};

export default SettingModal;
