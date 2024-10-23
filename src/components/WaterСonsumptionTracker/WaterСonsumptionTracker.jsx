import Container from "../Container/Container";
import css from "./WaterСonsumptionTracker.module.css";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlinePresentationChartBar } from "react-icons/hi2";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import TryTrackerButton from "../TryTrackerButton.jsx/TryTrackerButton";

export default function WaterСonsumptionTracker() {
  return (
    <section className={css.waterСonsumption}>
      <h1 className={css.welcomeTitle}>Water consumption tracker</h1>
      <h2 className={css.welcomeText}>Record daily water intake and track</h2>
      <h3 className={css.welcomeBenefitsTitle}>Tracker Benefits</h3>
      <ul className={css.welcomeList}>
        <li className={css.welcomeListItem}>
          <HiOutlineCalendarDays className={css.welcomeSvg} />
          <p>Habit drive</p>
        </li>
        <li className={css.welcomeListItem}>
          <HiOutlinePresentationChartBar className={css.welcomeSvg} />
          <p>View statistics</p>
        </li>
        <li className={css.welcomeListItem}>
          <HiOutlineWrenchScrewdriver className={css.welcomeSvg} />
          <p>Personal rate setting</p>
        </li>
      </ul>
      <TryTrackerButton />
    </section>
  );
}
