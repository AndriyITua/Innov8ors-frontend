import { useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import css from "./UserAuth.module.css";

const UserAuth = () => {
  const navigate = useNavigate();
  return (
    <button className={css.button} onClick={() => navigate("/signin")}>
      <span className={css.span}>Sign In</span>
      <CiUser className={css.icon} />
    </button>
  );
};

export default UserAuth;
