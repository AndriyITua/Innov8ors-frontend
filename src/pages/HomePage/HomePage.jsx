import css from "./HomePage.module.css";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import MonthStatsTable from "../../components/MonthStatsTable/MonthStatsTable";

export default function HomePage() {
  return (
    <div>
      <p>Home page</p>
      <WaterRatioPanel />
      <MonthStatsTable />
    </div>
  );
}
