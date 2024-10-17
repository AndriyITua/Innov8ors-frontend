import Container from "../Container/Container";
import WhyDrinkWater from "../WhyDrinkWater/WhyDrinkWater";
import WaterСonsumptionTracker from "../WaterСonsumptionTracker/WaterСonsumptionTracker";
import css from "./Main.module.css";
export default function Main() {
  return (
    <section className={css.welcomeSection}>
      <Container>
        <WaterСonsumptionTracker />
        <WhyDrinkWater />
      </Container>
    </section>
  );
}
