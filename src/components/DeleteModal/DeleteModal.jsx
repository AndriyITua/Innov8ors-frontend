import Container from "../Container/Container"
import css from "./DeleteModal.module.css"
import { CgClose } from "react-icons/cg";

export default function DeleteModal({isOpen, onClose, onDelete}) {
    if(!isOpen) return null;

    const handledelete =()=>{
        onDelete();
        onClose();
    }

    return(
        <Container>
           <div className={css.overlay}>
                <div className={css.content}>
                   <div className={css.closeTitleText}>
                        <div className={css.deleleClose}>
                            <h2 className={css.title}>Delete entry</h2>
                            <div className={css.buttonIcon}>
                                <button className={css.button} onClick={onClose}>
                                    <CgClose className={css.iconClose}/>
                                    </button>
                            </div>
                        </div>
                        <p className={css.text}>Are you sure you want to delete the entry?</p>
                   </div>
                   <div className={css.buttons}> 
                        <button className={css.delete} onClick={handledelete}>Delete </button>
                        <button className={css.cancel} onClick={onClose}>Cancel</button>
                   </div>
                </div>
           </div>
        </Container>
    )
}