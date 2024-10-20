import SettingModal from "../../SettingModal/SettingModal";
import UserLogoutModal from "../../UserLogoutModal/UserLogoutModal";
import css from "./TemporaryHeader.module.css";
import { useState } from "react";

const TemporaryHeader = () => {
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
    <header className={css.bar}>
      <button className={css.button} onClick={openSettingModal}>
        Settings
      </button>
      <SettingModal
        modalIsOpen={settingModalIsOpen}
        closeModal={closeSettingModal}
      />
      <button className={css.button} onClick={openLogoutModal}>
        Log Out
      </button>
      <UserLogoutModal
        logoutModalIsOpen={logoutModalIsOpen}
        closeLogoutModal={closeLogoutModal}
      />
    </header>
  );
};

export default TemporaryHeader;
