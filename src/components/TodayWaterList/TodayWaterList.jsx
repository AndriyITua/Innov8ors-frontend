import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useState } from "react";
import css from "./TodayWaterList.module.css"
import  glassWater from "../../assets/homePageImages/glassWater.svg"
import  deleteW from "../../assets/homePageImages/delete.svg"
import DeleteModal from "../DeleteModal/DeleteModal";
import ModalAddWater from "../ModalAddWater/ModalAddWater";
import ModalEntered from "../ModalEntered/ModalEntered"
export default function TodayWaterList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setselectedEntry] =useState(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [isModalOpenEntr, setModalOpenEntr] = useState(false);

    const openModal =(entry)=>{
        setselectedEntry(entry);
        setIsModalOpen(true);
    }
    const closeModal =()=>{
        setModalOpen(false)
        setIsModalOpen(false);
    }
    const handleDelete=()=>{
        console.log('Deleting entry:', selectedEntry);
        closeModal();
    };
    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOpenModalEntr = () => {
        setModalOpenEntr(true);
    };
    const handleCloseModalEntr = () => {
        setModalOpenEntr(false);
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
                            <button className={css.buttonIcon} onClick={handleOpenModalEntr}><HiOutlinePencilSquare/></button>
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
                
            </div>
                <div className={css.buttonAddWaterCont}>
                    <button type="submit" className={css.button} onClick={handleOpenModal}>
                       <div className={css.plus}> <HiOutlinePlus className={css.icon}/></div>
                        Add water</button>
                </div>
            <ModalEntered isOpen={isModalOpenEntr} onClose={handleCloseModalEntr}/>
            <ModalAddWater isOpen={ModalOpen} onClose={handleCloseModal}/>
            <DeleteModal isOpen={isModalOpen} onClose={closeModal} onDelete={handleDelete}/>
        </div>
    )
}