import css from "./UserLogoutForm.module.css";

const UserLogoutForm = () => {
  return (
    <div className={css.logoutForm}>
      <h2>Log Out</h2>
      <p>Do you really want to leave</p>
      <div className={css.buttonList}>
        <button type="submit" className={css.button}>
          Cancel
        </button>
        <button type="submit" className={css.button}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserLogoutForm;
