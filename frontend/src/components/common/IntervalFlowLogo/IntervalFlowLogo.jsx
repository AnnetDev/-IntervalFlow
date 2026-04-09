import RunnerIcon from './RunnerIcon';
import styles from './IntervalFlowLogo.module.css';

export default function IntervalFlowLogo() {
    return (
        <div className={styles.logo}>
            <div className={styles.animItem} style={{ animationDelay: '0s' }}>
                <RunnerIcon />
            </div>
            <div className={styles.logotextContainer}>
                <p
                    className={`${styles.logotext} ${styles.animItem}`}
                    style={{ animationDelay: '0.5s' }}
                >
                    Interval Flow
                </p>
                {/* Inconsistent casing: LogoLine vs logotext/logotextDescription */}
                <div className={`${styles.LogoLine} ${styles.animItem}`}
                    style={{ animationDelay: '1.2s' }}></div>
                <p className={`${styles.logotextDescription} ${styles.animItem}`}
                    style={{ animationDelay: '0.9s' }}>Interval Trainings</p>
            </div>
        </div>
    );
}
