import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import css from "./TodayWaterList.module.css"
import  glassWater from "../../assets/homePageImages/glassWater.svg"
import  deleteW from "../../assets/homePageImages/delete.svg"
import DeleteModal from "../DeleteModal/DeleteModal";
import { useState } from "react";
export default function TodayWaterList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setselectedEntry] =useState(null);

    const openModal =(entry)=>{
        setselectedEntry(entry);
        setIsModalOpen(true);
    }
    const closeModal =()=>{
        setIsModalOpen(false);
        setselectedEntry(null);
    }
    const handleDelete=()=>{
        console.log('Deleting entry:', selectedEntry);
        closeModal();
    };

    return (
        <div className={css.container}>
            <p className={css.title}>Today</p>
            <div className={css.contItem}>
            <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button onClick={()=>openModal()} className={css.buttonDel}> 
                            <img src={deleteW} alt="Delete"/>
                            </button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button className={css.buttonDel}> <img src={deleteW} alt="Delete"/></button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button className={css.buttonDel}> <img src={deleteW} alt="Delete"/></button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button className={css.buttonDel}> <img src={deleteW} alt="Delete"/></button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button className={css.buttonDel}> <img src={deleteW} alt="Delete"/></button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                <ul className={css.item}>
                    <li>
                        <img className={css.img} src={glassWater} alt="glass water"/>
                    </li>
                    <div className={css.time}>
                        <li className={css.water}>200 ml</li>
                        <li className={css.am}>14:00 PM</li>
                    </div>
                    <div className={css.editDel}>
                        <li >
                            <button className={css.buttonIcon}><HiOutlinePencilSquare/></button>
                        </li>
                        <li>
                           <button className={css.buttonDel}> <img src={deleteW} alt="Delete"/></button>
                        </li>
                    </div>
                </ul>
                <hr className={css.divider} />
                
                <div className={css.buttonAddWaterCont}>
                    <button type="submit" className={css.button}>
                       <div className={css.plus}> <HiOutlinePlus className={css.icon}/></div>
                        Add water</button>
                </div>
            </div>
            <DeleteModal isOpen={isModalOpen} onClose={closeModal} onDelete={handleDelete}/>
        </div>
    )
}