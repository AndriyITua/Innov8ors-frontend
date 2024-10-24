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
          <div className={css.container}>
            <ul>
              <li>
                <section className={css.norma}>
                  <DailyNorma />
                </section>
              </li>
              <li>
                <section className={css.WaterRatio}>
                  <WaterRatioPanel />
                </section>
              </li>
            </ul>
            <section className={css.TodayMonthWrap}>
              <TodayWaterList />
              <MonthStatsTable />
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
