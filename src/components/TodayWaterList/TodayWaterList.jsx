import { HiOutlinePlus } from "react-icons/hi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useEffect, useState } from "react";
import css from "./TodayWaterList.module.css";
import glassWater from "../../assets/homePageImages/glassWater.svg";
import deleteW from "../../assets/homePageImages/delete.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import ModalAddWater from "../ModalAddWater/ModalAddWater";
import ModalEntered from "../ModalEntered/ModalEntered";
import { useDispatch, useSelector } from "react-redux";
import { featchWater } from "../../redux/water/opertionsEditWater";
import { selectWaterRecords } from "../../redux/water/selectors";
import { deleteWaterRecord } from "../../redux/water/operationsDelete";

export default function TodayWaterList({ updateCalender }) {
  const records = useSelector(selectWaterRecords);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedEntry, setselectedEntry] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);

  const [isModalOpenEntr, setModalOpenEntr] = useState(false);
  const [isSetectedEntery, isSetSelectedEntery] = useState(null);

  const convertTo24HourFormat = time => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const lastUpdateDate = localStorage.getItem("lastUpdateDate");
    const today = new Date().toDateString();

    if (lastUpdateDate !== today) localStorage.setItem("lastUpdateDate", today);
    dispatch(featchWater());
    updateCalender();
  }, [dispatch]);

  //модалка видаленння води
  const openModal = entryId => {
    setselectedEntry(entryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedEntry) {
      try {
        await dispatch(deleteWaterRecord(selectedEntry)).unwrap();
        dispatch(featchWater());
        updateCalender();
      } catch {
        // } finally {
        closeModal();
      }
    }
  };
  // модалка додавання води
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //модалка редагування води
  const handleOpenModalEntr = idEntery => {
    isSetSelectedEntery(idEntery);
    setModalOpenEntr(true);
  };
  const handleCloseModalEntr = () => {
    isSetSelectedEntery(null);
    setModalOpenEntr(false);
  };

  useEffect(() => {
    if (isModalOpen || ModalOpen || isModalOpenEntr) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, ModalOpen, isModalOpenEntr]);

  return (
    <div className={css.container}>
      <p className={css.title}>Today</p>
      <div className={css.contItem}>
        {records.length > 0 && records.some(record => record && record.amount)
          ? records.map(
              record =>
                record &&
                record.amount && (
                  <div key={record._id}>
                    <ul className={css.item}>
                      <li>
                        <img
                          className={css.img}
                          src={glassWater}
                          alt="glass water"
                        />
                      </li>
                      <div className={css.time}>
                        <li className={css.water}>{record.amount} ml</li>
                        <li className={css.am}>
                          {convertTo24HourFormat(record.consumptionTime)}
                        </li>
                      </div>
                      <div className={css.editDel}>
                        <li>
                          <button
                            className={css.buttonIcon}
                            onClick={() => handleOpenModalEntr(record._id)}
                          >
                            <HiOutlinePencilSquare />
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => openModal(record._id)}
                            className={css.buttonDel}
                          >
                            <img src={deleteW} alt="Delete" />
                          </button>
                        </li>
                      </div>
                    </ul>
                    <hr className={css.divider} />
                  </div>
                )
            )
          : null}
        <div className={css.buttonAddWaterCont}>
          <button
            type="submit"
            className={css.button}
            onClick={handleOpenModal}
          >
            <div className={css.plus}>
              {" "}
              <HiOutlinePlus className={css.icon} />
            </div>
            Add water
          </button>
        </div>
      </div>
      <ModalEntered
        isOpen={isModalOpenEntr}
        onClose={handleCloseModalEntr}
        idRecord={isSetectedEntery}
        updateCalender={updateCalender}
      />
      <ModalAddWater
        isOpen={ModalOpen}
        onClose={handleCloseModal}
        updateCalender={updateCalender}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
}
