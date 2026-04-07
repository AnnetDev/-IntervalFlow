import { useState, useRef, useEffect } from 'react';
import RunnerIcon from '../../common/IntervalFlowLogo/RunnerIcon';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { Info, AppWindow, User } from 'lucide-react';

const Header = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Handles click-outside but not Escape key — add a keydown listener for accessibility
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.headerIcon}>
                <Link to="/exercises">
                    <RunnerIcon />
                    Interval Flow
                </Link>
            </div>

            <div className={styles.info} ref={ref}>
                {/* Missing aria-label — screen readers will announce this as an unlabelled button */}
                <button
                    className={styles.infoBtn}
                    onClick={() => setOpen((p) => !p)}
                >
                    <Info size={26} />
                </button>

                {open && (
                    <div className={styles.dropdown}>
                        <Link
                            to="/about"
                            className={styles.dropdownItem}
                            onClick={() => setOpen(false)}
                        >
                            <AppWindow size={16} />
                            About app
                        </Link>
                        <Link
                            to="/author"
                            className={styles.dropdownItem}
                            onClick={() => setOpen(false)}
                        >
                            <User size={16} />
                            About author
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
