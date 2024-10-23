import css from "./UserLogoutForm.module.css";
import { TfiClose } from "react-icons/tfi";

const UserLogoutForm = ({ closeLogoutModal }) => {
  return (
    <div className={css.logoutForm}>
      <div className={css.logoutTitle}>
        <h2 className={css.logoutTitleText}>Log Out</h2>
        <button className={css.closeButton} onClick={closeLogoutModal}>
          <TfiClose className={css.closeIcon} />
        </button>
      </div>
      <p className={css.logoutText}>Do you really want to leave</p>
      <div className={css.buttonList}>
        <button type="submit" className={css.logoutbutton}>
          Log Out
        </button>
        <button className={css.cancelButton} onClick={closeLogoutModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserLogoutForm;
