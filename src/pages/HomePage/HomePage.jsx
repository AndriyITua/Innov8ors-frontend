import Container from "../../components/Container/Container";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={css.homePage}>
        <Container>
          <section className={css.WaterRatio}>
            <WaterRatioPanel />
          </section>
        </Container>
      </section>
    </main>
  );
}
