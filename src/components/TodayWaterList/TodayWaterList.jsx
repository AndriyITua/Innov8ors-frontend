import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import css from "./TodayWaterList.module.css"
import  glassWater from "../../assets/homePageImages/glassWater.svg"
import  deleteW from "../../assets/homePageImages/delete.svg"
import DeleteModal from "../DeleteModal/DeleteModal";
import ModalAddWater from "../ModalAddWater/ModalAddWater";
import ModalEntered from "../ModalEntered/ModalEntered"
import { useDispatch, useSelector } from "react-redux";
import { featchWater } from "../../redux/water/opertionsEditWater";
import { selectWaterRecords } from "../../redux/water/selectors";


export default function TodayWaterList() {
    const records = useSelector(selectWaterRecords);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setselectedEntry] =useState(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [isModalOpenEntr, setModalOpenEntr] = useState(false);

    useEffect(()=>{
        dispatch(featchWater());
    },[dispatch])

    const openModal =(entry)=>{
        setselectedEntry(entry);
        setIsModalOpen(true);
    }
    const closeModal =()=>{
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
                {records.length> 0 ? (
                    records.map( (record) => (
                     <div key={record._id}>
                        	<ul className={css.item}>
                            	<li>
                                	<img className={css.img} src={glassWater} alt="glass water"/>
                            	</li>
                            	<div className={css.time}>
                            	<li className={css.water}>{record.amount} ml</li>
                            	<li className={css.am}>{record.createdAt}pm</li>
                        	</div>
                        	<div className={css.editDel}>
                            	<li>
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
                    	</div>
                 	))
                ):(
                <div className={css.buttonAddWaterCont}>
                    <button type="submit" className={css.button} onClick={handleOpenModal}>
                       <div className={css.plus}> <HiOutlinePlus className={css.icon}/></div>
                        Add water</button>
                </div>
            )}
            </div>
            <ModalEntered isOpen={isModalOpenEntr} onClose={handleCloseModalEntr}/>
            <ModalAddWater isOpen={ModalOpen} onClose={handleCloseModal}/>
            <DeleteModal isOpen={isModalOpen} onClose={closeModal} onDelete={handleDelete}/>
        </div>
    )
}