import { useNavigate } from "react-router-dom";
import css from "./UserAuth.module.css";
import Avatar from "../../assets/icons/Avatar";

const UserAuth = () => {
  const navigate = useNavigate();
  return (
    <button className={css.button} onClick={() => navigate("/signin")}>
      <span className={css.span}>Sign in</span>
      <Avatar />
    </button>
  );
};

export default UserAuth;
