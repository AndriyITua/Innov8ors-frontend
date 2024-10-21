import Container from "../../components/Container/Container";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <section className={css.homePage}>
        <Container>
          <section className={css.norma}>
            <DailyNorma />
          </section>
          <section className={css.WaterRatio}>
            <WaterRatioPanel />
          </section>
          <section className={css.TodayMonthWrap}>
            <TodayWaterList />
            <MonthStatsTable />
          </section>
        </Container>
      </section>
    </main>
  );
}
