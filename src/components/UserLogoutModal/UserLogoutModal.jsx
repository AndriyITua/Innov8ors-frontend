import Modal from "react-modal";

import css from "./UserLogoutModal.module.css";
import UserLogoutForm from "../UserLogoutForm/UserLogoutForm";

const UserLogoutModal = ({ logoutModalIsOpen, closeLogoutModal }) => {
  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={logoutModalIsOpen}
        onRequestClose={closeLogoutModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <div className={css.card}>
          <UserLogoutForm />
        </div>
      </Modal>
    </div>
  );
};

export default UserLogoutModal;
