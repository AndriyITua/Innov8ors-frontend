import WhyDrinkWater from "../WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./Main.module.css";
import Container from "../Container/Container";
export default function Main() {
  return (
    <main className={css.welcomeSection}>
      <Container>
        <div className={css.welcomeSectionContent}>
          <WaterСonsumptionTracker />
          <WhyDrinkWater />
        </div>
      </Container>
    </main>
  );
}
