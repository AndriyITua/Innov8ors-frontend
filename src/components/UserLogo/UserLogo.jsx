import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Modal from "react-modal";
import { GoChevronDown } from "react-icons/go";
import css from "./UserLogo.module.css";
import Avatar from "../../assets/icons/Avatar";

Modal.setAppElement("#root");

const UserLogo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const buttonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleToggleModal = () => {
    if (!isModalOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.right - 118,
      });
    }
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isModalOpen && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setModalPosition({
          top: buttonRect.bottom + 5,
          left: buttonRect.right - 118,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  return (
    <>
      <button
        className={css.button}
        ref={buttonRef}
        onClick={handleToggleModal}
        style={{ position: "relative" }}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.fullName} />
        ) : (
          <span>{user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]}</span>
        )}
        {user?.fullName || user?.email}
        <Avatar />
        <GoChevronDown className={css.icon} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "118px",
            height: "88px",
            position: "absolute",
            top: modalPosition.top,
            left: modalPosition.left,
            padding: "16px",
            overflow: "none",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <UserLogoModal onClose={handleToggleModal} />
      </Modal>
    </>
  );
};

export default UserLogo;
