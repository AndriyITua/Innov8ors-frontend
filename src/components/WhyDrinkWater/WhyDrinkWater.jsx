import css from "./WhyDrinkWater.module.css";
export default function WhyDrinkWater() {
  return (
    <div className={css.whyDrinkWater}>
      <h3 className={css.whyDrinkWaterTitle}>Why drink water</h3>
      <ul className={css.whyDrinkWaterList}>
        <li className={css.whyDrinkWaterListItem}>
          Supply of nutrients to all organs
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Providing oxygen to the lungs
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Maintaining the work of the heart
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Release of processed substances
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Ensuring the stability of the internal environment
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Maintaining within the normal temperature
        </li>
        <li className={css.whyDrinkWaterListItem}>
          Maintaining an immune system capable of resisting disease
        </li>
      </ul>
    </div>
  );
}
