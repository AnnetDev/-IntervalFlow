import { useState } from 'react';
import styles from './Modal.module.css';
import { X } from 'lucide-react';

export function Modal({ isOpen, children, onClose }) {
    const [visible, setVisible] = useState(isOpen);

    // Setting state during render (below) triggers an extra re-render — consider using useEffect instead
    if (isOpen && !visible) setVisible(true);

    const closing = !isOpen && visible;

    function handleAnimationEnd() {
        if (closing) setVisible(false);
    }

    if (!visible) return null;

    return (
        <>
            {/* Fragment is redundant if you wrap overlay + modal in a single container div */}
            <div
                className={`${styles.overlay} ${closing ? styles.overlayOut : ''}`}
                onClick={onClose}
            />
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
