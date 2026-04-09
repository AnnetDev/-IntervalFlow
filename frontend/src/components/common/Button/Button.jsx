import { useState, useEffect } from 'react';
import { CircleArrowUp } from 'lucide-react';
import styles from './Button.module.css';

export function Button({
    children,
    onClick,
    disabled,
    className,
    type,
    variant,
}) {
    return (
        <button
            className={`${styles.button} ${variant ? styles[variant] : ''} ${className ?? ''}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}

// ScrollToTopBtn is a separate concern from Button — consider its own file
export function ScrollToTopBtn({ scrollContainerRef }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = scrollContainerRef?.current;
        if (!element) return;
        function onScroll() {
            setVisible(element.scrollTop > 200);
        }
        element.addEventListener('scroll', onScroll);
        return () => element.removeEventListener('scroll', onScroll);
    }, [scrollContainerRef]);

    if (!visible) return null;

    // Fragment is redundant — single <button> element
    return (
        <>
            <button
                className={styles.scrollBtn}
                onClick={() =>
                    scrollContainerRef.current?.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }
                aria-label="Scroll to top"
            >
                <CircleArrowUp size={40} />
            </button>
        </>
    );
}
