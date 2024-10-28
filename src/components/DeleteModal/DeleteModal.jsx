import Container from "../Container/Container";
import css from "./DeleteModal.module.css";
import { CgClose } from "react-icons/cg";
import Loader from "../Loader/Loader";
import { useState, useRef, useEffect } from "react";

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  const [loading, setLoading] = useState(false); 
  const backdropRef = useRef(null);
  
  const handleDelete = async () => {
    setLoading(true); 
    await  onDelete(); 
    setLoading(false); 
    onClose(); 
  };
  const handleClose = async () => {
    setLoading(true); 
    setTimeout(() => {
      onClose(); 
      setLoading(false); 
    }, 300); 
  };
  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const handleEscape = event => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const handleClickOutside = event => {
      if (backdropRef.current && !backdropRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Container>
      <div className={css.overlay}>
        {loading ? ( 
          <div className={css.forLoder}>
            <Loader /> 
          </div>
        ) : (
          <div className={css.content}>
            <div className={css.closeTitleText}>
              <div className={css.deleleClose}>
                <h2 className={css.title}>Delete entry</h2>
                <div className={css.buttonIcon}>
                  <button className={css.button} onClick={ handleClose}>
                    <CgClose className={css.iconClose} />
                  </button>
                </div>
              </div>
              <p className={css.text}>
                Are you sure you want to delete the entry?
              </p>
            </div>
            <div className={css.buttons}>
              <button className={css.delete} onClick={handleDelete}>
                Delete
              </button>
              <button className={css.cancel} onClick={ handleClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
