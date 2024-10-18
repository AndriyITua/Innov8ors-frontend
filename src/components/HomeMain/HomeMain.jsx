import Container from "../Container/Container";
import css from "./HomeMain.module.css";

export default function HomeMain() {
  return (
    <section className={css.homePage}>
      <Container>
        <div className={css.verticalLine}></div>
      </Container>
    </section>
  );
}
