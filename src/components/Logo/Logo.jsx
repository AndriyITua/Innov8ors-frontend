import { useNavigate } from "react-router-dom";
import logo from "../../assets/header/Logo.svg";
import css from "./Logo.module.css";

export const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
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
