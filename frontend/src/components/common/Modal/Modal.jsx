import { useState } from 'react';
import styles from './Modal.module.css';
import { X } from 'lucide-react';

export function Modal({ isOpen, children, onClose }) {
  const [visible, setVisible] = useState(isOpen);

  if (isOpen && !visible) setVisible(true);

  const closing = !isOpen && visible;

  function handleAnimationEnd() {
    if (closing) setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      <div className={`${styles.overlay} ${closing ? styles.overlayOut : ''}`} onClick={onClose} />
      <div
        className={`${styles.modalContainer} ${closing ? styles.containerOut : ''}`}
        onAnimationEnd={handleAnimationEnd}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={22} />
        </button>
        {children}
      </div>
    </>
  );
}
