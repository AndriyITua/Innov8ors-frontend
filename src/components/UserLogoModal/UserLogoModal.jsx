import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import { useState } from "react";
import Modal from "react-modal";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";

Modal.setAppElement("#root");

export const UserLogoModal = () => {
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false); //стейт для статуса модалки
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false); //стейт для статуса модалки

  // фyнкции для Setting модалки
  function openSettingModal() {
    setSettingModalIsOpen(true);
  }

  function closeSettingModal() {
    setSettingModalIsOpen(false);
  }

  // фyнкции для Logout модалки
  function openLogoutModal() {
    setLogoutModalIsOpen(true);
  }

  function closeLogoutModal() {
    setLogoutModalIsOpen(false);
  }

  return (
    <div className={css.div}>
      <button className={css.button} onClick={openSettingModal}>
        <IoSettingsOutline className={css.icon} />
        <span className={css.span}>Setting</span>
      </button>
      <SettingModal
        modalIsOpen={settingModalIsOpen}
        closeModal={closeSettingModal}
      />
      <button className={css.button} onClick={openLogoutModal}>
        <HiOutlineLogout className={css.icon} />
        <span className={css.span}>Logout</span>
      </button>
      <UserLogoutModal
        logoutModalIsOpen={logoutModalIsOpen}
        closeLogoutModal={closeLogoutModal}
      />
    </div>
  );
};

export default UserLogoModal;
