import { CiCirclePlus } from "react-icons/ci";
import { PiLineVertical } from "react-icons/pi";
import css from "./WaterRatioPanel.module.css"
import { useState } from "react";
export default function WaterRatioPanel() {
    const [value, setValue] = useState(0)
    return(
        <div className={css.container}>
            <div>
                <p className={css.title}>Today</p>
                <input 
                className={css.input} 
                type="range" 
                id="slider" 
                min="0" 
                max="100" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{
                background: `linear-gradient(to right, #9ebbff ${value}%, #d7e3ff ${value}%)`
                }}
                >
                </input>
                <ul className={css.item}>
                    <li className={css.lineContainer}> 
                        <PiLineVertical className={css.line}/>
                        <span className={css.startEnd}>0%</span>
                        </li>
                    <li className={css.lineContainer}>
                        <PiLineVertical className={css.line}/>
                        50%
                        </li>
                    <li className={css.lineContainer}> 
                    <PiLineVertical className={css.line}/>
                    <span className={css.startEnd}>100%</span>
                        </li>
                </ul>
            </div>
            <button className={css.button}>
                <CiCirclePlus className={css.icon}/>
                Add Water
            </button>
        </div>
    )
}