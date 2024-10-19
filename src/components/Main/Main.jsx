import WhyDrinkWater from "../WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./Main.module.css";
export default function Main() {
  return (
    <main className={css.welcomeSection}>
      <WaterСonsumptionTracker />
      <WhyDrinkWater />
    </main>
  );
}
