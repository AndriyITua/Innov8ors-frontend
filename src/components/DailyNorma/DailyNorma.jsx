import { useState } from "react";
import css from "./DailyNorma.module.css";
import { DailyNormaModal } from "../DailyNormaModal/DailyNormaModal";
import { selectDailyRate } from "../../redux/water/selectors.js";
import { useSelector } from "react-redux";

export default function DailyNorma() {
  const user = useSelector(selectDailyRate);
  const [openDailyNormaModal, setOpenDailyNormaModal] = useState(false);

  const closeModal = () => {
    setOpenDailyNormaModal(false);
  };
  const openModal = () => {
    setOpenDailyNormaModal(true);
  };

  const dailyNorma = user.dailyNorma / 1000;
  return (
    <div className={css.divDaily}>
      <h3 className={css.title}>My daily norma</h3>
      <div className={css.containerDaily}>
        <p className={css.litres}>{dailyNorma ? `${dailyNorma}L` : "2.0L"}</p>
        <button
          className={css.buttonDaily}
          onClick={() => openModal()}
          type="button"
        >
          Edit
        </button>
        <DailyNormaModal isOpen={openDailyNormaModal} onClose={closeModal} />
      </div>
    </div>
  );
}
