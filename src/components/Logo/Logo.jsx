import { useNavigate } from "react-router-dom";
import logo from "../../assets/header/Logo.png";

export const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={logo} alt="Logo" />
    </div>
  );
};
