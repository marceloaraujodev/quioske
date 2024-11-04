import c from './Modal.module.css';

export default function Modal({ children, isModalOpen, onClose, item }) {
  if (!isModalOpen) return null;

  return (
    <div className={c.cont}>
      <div className={c.modal}>
          <button className={c.closeBtn} onClick={onClose}>
            X
          </button>
          <div className={c.wrapper}>
            <div className={c.modalContent}>
                <span className={c.title}>
                 {item.name}
                </span>
              {children}
            </div>
          </div>
      </div>
    </div>
  );
}
