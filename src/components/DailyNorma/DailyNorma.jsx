import { useEffect, useState } from "react";
import Modal from "react-modal";
import DailyNormaModal from "../DailyNormaModal/DailyNormaModal";
import css from "../DailyNorma/DailyNorma.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectDailyRate } from "../../redux/water/selectors";
import { fetchUserById } from "../../redux/auth/operationUserId";

Modal.setAppElement("#root");

export default function DailyNorma({ updateCalender }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dailyRate = useSelector(selectDailyRate);

  useEffect(() => {
    const getWater = async () => {
      try {
        await dispatch(fetchUserById());
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };
    getWater();
  }, [dispatch]);

  const openModal = () => {
    document.body.classList.add("modal-open");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    setModalIsOpen(false);
  };

  return (
    <>
      <div className={css.div}>
        <h4 className={css.title}>My daily norma</h4>
        <p className={css.litres}>{(dailyRate / 1000).toFixed(1)} L</p>
        <button className={css.buttonDaily} onClick={openModal}>
          Edit
        </button>
      </div>
      <DailyNormaModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        updateCalender={updateCalender}
      />
    </>
  );
}
