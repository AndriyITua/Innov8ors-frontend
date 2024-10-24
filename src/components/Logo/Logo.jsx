import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/header/Logo.svg";
import css from "./Logo.module.css";

export const Logo = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/welcome");
    }
  };
  return (
    <div
      className={css.div}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img className={css.img} src={logo} alt="Logo" />
      <span className={css.text}>
        TRACKER
        <br />
        OF WATER
      </span>
    </div>
  );
};
