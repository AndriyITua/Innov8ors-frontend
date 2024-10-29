import SettingModal from "../SettingModal/SettingModal";
import UserLogoutModal from "../UserLogoutModal/UserLogoutModal";
import { useState } from "react";
import Modal from "react-modal";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import css from "./UserLogoModal.module.css";

Modal.setAppElement("#root");

export const UserLogoModal = () => {
  const [settingModalIsOpen, setSettingModalIsOpen] = useState(false);
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  function openSettingModal() {
    document.body.classList.add("modal-open");
    setSettingModalIsOpen(true);

    const userLogoModal = document.getElementById("UserLogo");
    if (userLogoModal) {
      userLogoModal.style.display = "none";
    }
  }

  function closeSettingModal() {
    document.body.classList.remove("modal-open");
    setSettingModalIsOpen(false);

    const userLogoModal = document.getElementById("UserLogo");
    if (userLogoModal) {
      userLogoModal.style.display = "flex";
    }
  }
  function openLogoutModal() {
    document.body.classList.add("modal-open");
    setLogoutModalIsOpen(true);

    const userLogoModal = document.getElementById("UserLogo");
    if (userLogoModal) {
      userLogoModal.style.display = "none";
    }
  }

  function closeLogoutModal() {
    document.body.classList.remove("modal-open");
    setLogoutModalIsOpen(false);

    const userLogoModal = document.getElementById("UserLogo");
    if (userLogoModal) {
      userLogoModal.style.display = "flex";
    }
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
