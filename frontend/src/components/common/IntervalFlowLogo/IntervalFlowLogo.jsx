import TimerIcon from './TimerIcon';
import LogoLine from './LogoLine';
import styles from './IntervalFlowLogo.module.css';

export default function IntervalFlowLogo() {
    return (
        <div className={styles.logo}>
            <div className={styles.animItem} style={{ animationDelay: '0s' }}>
                <TimerIcon />
            </div>
            <div className={styles.logotextContainer}>
                <p
                    className={`${styles.logotext} ${styles.animItem}`}
                    style={{ animationDelay: '0.5s' }}
                >
                    Interval
                </p>
                <div
                    className={styles.animItem}
                    style={{ animationDelay: '1.2s' }}
                >
                    <LogoLine />
                </div>
                <p
                    className={`${styles.logotext} ${styles.animItem}`}
                    style={{ animationDelay: '0.5s' }}
                >
                    Flow
                </p>
            </div>
        </div>
    );
}
