import Container from "../Container/Container";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.homePage}>
      <Container>
        <WaterRatioPanel />
        <div className={css.verticalLine}></div>
      </Container>
    </section>
  );
}
