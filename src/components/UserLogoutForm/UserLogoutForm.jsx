import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operationLogin";
import { TfiClose } from "react-icons/tfi";

import css from "./UserLogoutForm.module.css";


const UserLogoutForm = ({ closeLogoutModal }) => {
  const dispatch = useDispatch();

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
        <button
          type="button"
          className={css.logoutbutton}
          onClick={() => {
            dispatch(logout());
            closeLogoutModal();
          }}
        >
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
