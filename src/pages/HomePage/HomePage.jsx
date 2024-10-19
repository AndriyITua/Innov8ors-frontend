import css from "./HomePage.module.css";
import WaterRatioPanel from "../../components/WaterRatioPanel/WaterRatioPanel";
import  TodayWaterList  from "../../components/TodayWaterList/TodayWaterList";


export default function HomePage() {
  return <div>
    <p>Home page</p>
    <WaterRatioPanel/>
    <TodayWaterList/>
  </div> 
  
    
  
}
