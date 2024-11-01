import Container from "../../components/Container/Container";
import DailyNorma from "../../components/DailyNorma/DailyNorma";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";
import TodayWaterList from "../../components/TodayWaterList/TodayWaterList";
import css from "./HomePage.module.css";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchWaterMonth } from "../../redux/water/operationsMonth";

export default function HomePage() {
  const dispatch = useDispatch();

  const updateCalender = useCallback(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonts = currentDate.getMonth() + 1;
    dispatch(fetchWaterMonth({ year: currentYear, month: currentMonts }));
  }, [dispatch]);

  return (
    <main>
      <section className={css.homePage}>
        <Container>
          <div className={css.container}>
            <ul>
              <li>
                <section className={css.norma}>
                  <DailyNorma updateCalender={updateCalender} />
                </section>
              </li>
              <li>
                <section className={css.WaterRatio}>
                  <WaterRatioPanel updateCalender={updateCalender} />
                </section>
              </li>
            </ul>
            <section className={css.TodayMonthWrap}>
              <TodayWaterList updateCalender={updateCalender} />
              <MonthStatsTable updateCalender={updateCalender} />
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
