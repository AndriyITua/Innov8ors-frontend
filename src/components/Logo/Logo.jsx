import { useNavigate } from "react-router-dom";
import logo from "../../assets/header/Logo.png";
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
        Tracker
        <br />
        of water
      </span>
    </div>
  );
};
