import css from "./WaterСonsumptionTracker.module.css";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import TryTrackerButton from "../TryTrackerButton/TryTrackerButton";

export default function WaterСonsumptionTracker() {
  return (
    <div className={css.waterСonsumption}>
      <h1 className={css.welcomeTitle}>Water consumption tracker</h1>
      <h2 className={css.welcomeText}>Record daily water intake and track</h2>
      <h3 className={css.welcomeBenefitsTitle}>Tracker Benefits</h3>
      <ul className={css.welcomeList}>
        <li className={css.welcomeListItem}>
          <div className={css.svgBox}>
            <IoCalendarOutline className={css.welcomeSvg} />
          </div>
          <p>Habit drive</p>
        </li>
        <li className={css.welcomeListItem}>
          <div className={css.svgBox}>
            <HiOutlinePresentationChartBar className={css.welcomeSvg} />
          </div>
          <p>View statistics</p>
        </li>
        <li className={css.welcomeListItem}>
          <div className={css.svgBox}>
            <HiWrenchScrewdriver className={css.welcomeSvg} />
          </div>
          <p>Personal rate setting</p>
        </li>
      </ul>

      <TryTrackerButton />
    </div>
  );
}
