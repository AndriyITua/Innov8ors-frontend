import { CiCirclePlus } from "react-icons/ci";
import { PiLineVertical } from "react-icons/pi";
import css from "./WaterRatioPanel.module.css";
import { useState } from "react";
import ModalAddWater from "../../components/ModalAddWater/ModalAddWater";

export default function WaterRatioPanel() {
  const [value, setValue] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div>
        <p className={css.title}>Today</p>
        <input
          className={css.input}
          type="range"
          id="slider"
          min="0"
          max="100"
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{
            background: `linear-gradient(to right, #9ebbff ${value}%, #d7e3ff ${value}%)`,
          }}
        ></input>
        <ul className={css.item}>
          <li className={css.lineContainer}>
            <PiLineVertical className={css.line} />
            <span className={css.startEnd}>0%</span>
          </li>
          <li className={css.lineContainer}>
            <PiLineVertical className={css.line} />
            50%
          </li>
          <li className={css.lineContainer}>
            <PiLineVertical className={css.line} />
            <span className={css.startEnd}>100%</span>
          </li>
        </ul>
      </div>
      <button type="submit" className={css.button} onClick={handleOpenModal}>
        <CiCirclePlus className={css.icon} />
        Add Water
      </button>
      <ModalAddWater isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
