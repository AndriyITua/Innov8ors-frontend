import Container from "../Container/Container";
import css from "./DeleteModal.module.css";
import { CgClose } from "react-icons/cg";
import Loader from "../Loader/Loader";
import { useState } from "react";

export default function DeleteModal({ isOpen, onClose, onDelete }) {
  const [isLoading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handledelete = () => {
    setLoading(true);
    onDelete();
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <Container>
      <div className={css.overlay}>
        {isLoading ? (
          <div className={css.forLoder}>
            <Loader />
          </div>
        ) : (
          <div className={css.content}>
            <div className={css.closeTitleText}>
              <div className={css.deleleClose}>
                <h2 className={css.title}>Delete entry</h2>
                <div className={css.buttonIcon}>
                  <button className={css.button} onClick={onClose}>
                    <CgClose className={css.iconClose} />
                  </button>
                </div>
              </div>
              <p className={css.text}>
                Are you sure you want to delete the entry?
              </p>
            </div>
            <div className={css.buttons}>
              <button className={css.delete} onClick={handledelete}>
                Delete
              </button>
              <button className={css.cancel} onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
