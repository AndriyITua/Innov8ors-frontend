import { useState } from "react";
import { useSelector } from "react-redux";
import UserLogoModal from "../UserLogoModal/UserLogoModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserLogo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => state.auth.user);

  const handleToggleModal = () => setModalOpen(!isModalOpen);

  return (
    <>
      <button onClick={handleToggleModal}>
        {user?.avatar ? (
          <img src={user.avatar} alt={user.fullName} />
        ) : (
          <span>{user?.fullName?.[0]?.toUpperCase() || user?.email?.[0]}</span>
        )}
        {user?.fullName || user?.email}
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <UserLogoModal onClose={handleToggleModal} />
      </Modal>
    </>
  );
};

export default UserLogo;
