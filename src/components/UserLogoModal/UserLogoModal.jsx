/*import SettingModal from "../SettingModal";
import UserLogoutModal from "../UserLogoutModal";
import { useState } from "react";*/
import Modal from "react-modal";

Modal.setAppElement("#root");

export const UserLogoModal = () => {
  /*const [isSettingModalOpen, setSettingModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);*/

  return (
    /*<div>
      <button onClick={() => setSettingModalOpen(true)}>Setting</button>
      <button onClick={() => setLogoutModalOpen(true)}>Logout</button>
    </div>*/
    <div>
      <button>SettingModal</button>
      <button>Log out</button>
    </div>
  );
};

export default UserLogoModal;
