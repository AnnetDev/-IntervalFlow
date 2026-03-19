import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './SplashPage.module.css';
import IntervalFlowLogo from '../../components/common/IntervalFlowLogo/IntervalFlowLogo';

export default function SplashPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timers = [
            setTimeout(() => navigate('/exercises', { replace: true }), 4000),
        ];
        return () => timers.forEach(clearTimeout);
    }, [navigate]);

    return (
        <div className={styles.splashPage}>
            <IntervalFlowLogo />
        </div>
    );
}
