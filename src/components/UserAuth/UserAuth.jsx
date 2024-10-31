import { useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./UserAuth.module.css";
import Avatar from "../../assets/icons/Avatar";

const UserAuth = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      className={css.button}
      onClick={() => navigate("/signin")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? css.spanHovered : css.span}>Sign in</span>
      <Avatar
        color={isHovered ? "var(--secondary-color-orange, #ff9d43)" : "#2F2F2F"}
      />
    </button>
  );
};

export default UserAuth;
