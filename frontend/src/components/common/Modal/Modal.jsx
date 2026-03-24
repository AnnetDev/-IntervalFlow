import styles from './Modal.module.css';
// import { useModal } from '../../../hooks/useModal';
import { X } from 'lucide-react';


export function Modal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modalContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={18} />
        </button>
        {children}
      </div>
    </>
  )
} 