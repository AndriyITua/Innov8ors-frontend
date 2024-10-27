import { useState } from "react";
import css from "../DailyNorma/DailyNorma.module.css";
import { DailyNormaModal } from "../DailyNormaModal/DailyNormaModal";

export default function DailyNorma() {
  const [openDailyNormaModal, setOpenDailyNormaModal] = useState(false);

  const closeModal = () => {
    // document.body.classList.remove("modal-open");
    setOpenDailyNormaModal(false);
  };
  const openModal = () => {
    // document.body.classList.add("modal-open");
    setOpenDailyNormaModal(true);
  };

  const dailyNorma = 1.5;
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
      </div>
    </div>
  );
}
