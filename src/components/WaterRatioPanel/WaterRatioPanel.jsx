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
  const getFontStyle = (currentValue, targetValue) => {
    return {
      fontSize: currentValue === targetValue ? '16px' : '12px',
      fontWeight: currentValue === targetValue ? '500' : '400',
    };
  };
  return (
    <div className={css.container}>
      <div className={css.panel}>
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
            pointerEvents: "none", // Блокує взаємодію з мишею
          }}
        ></input>
        <ul className={css.item}>
          <li className={css.lineContainer}>
            <div><PiLineVertical className={css.line} /></div>
            <span className={css.startEnd} style={ getFontStyle(value, 0)}>0%</span>
          </li>
          <li className={css.lineContainer}>
            <PiLineVertical className={css.line} />
            <span className={css.startEnd} style={ getFontStyle(value, 50) }>50%</span>
          </li>
          <li className={css.lineContainer}>
            <PiLineVertical className={css.line} />
            <span className={css.startEnd}  style={ getFontStyle(value, 100)}>100%</span>
          </li>
        </ul>
      </div>
      <button type="submit" className={css.button} onClick={handleOpenModal}>
        <CiCirclePlus className={css.icon} />
        Add Water
      </button>
      <ModalAddWater isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
