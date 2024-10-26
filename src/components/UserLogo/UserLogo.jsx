import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchUserById } from "../../redux/user/userOperations";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Modal from "react-modal";
import { GoChevronDown } from "react-icons/go";
import css from "./UserLogo.module.css";

Modal.setAppElement("#root");

const UserLogo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => state.user);
  const buttonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleToggleModal = () => {
    if (!isModalOpen) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      setModalPosition({
        top: screenWidth >= 1440 ? buttonRect.bottom + 6 : buttonRect.bottom,
        left: buttonRect.right - 118,
      });

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (isModalOpen && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        setModalPosition({
          top: screenWidth >= 1440 ? buttonRect.bottom + 6 : buttonRect.bottom,
          left: buttonRect.right - 118,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(fetchUserById(storedUserId));
    }
  }, [dispatch]);

  const getEmailLocalPart = email => {
    if (!email) return "";
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.slice(0, atIndex) : email;
  };

  return (
    <>
      <button
        className={css.button}
        ref={buttonRef}
        onClick={handleToggleModal}
        style={{ position: "relative" }}
      >
        <span className={css.userName}>
          {user.username || getEmailLocalPart(user.email)}
        </span>
        {user.userphoto ? (
          <img
            src={user.userphoto}
            alt={user.username || user.email}
            className={css.avatar}
          />
        ) : (
          <span className={css.initial}>
            {user.username?.[0]?.toUpperCase() ||
              user.email?.[0]?.toUpperCase()}
          </span>
        )}

        <GoChevronDown className={css.icon} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        style={{
          overlay: {
            backgroundColor: "transparent",
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
