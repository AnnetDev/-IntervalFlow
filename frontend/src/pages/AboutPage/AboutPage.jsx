import { Dumbbell, Timer, Library } from 'lucide-react';
import Layout from '../../components/layout/Layout/Layout';
import styles from './AboutPage.module.css';

// Store component refs instead of JSX to avoid creating elements at module-load time
const features = [
    {
        icon: <Library size={20} />,
        text: 'Browse and filter an exercise library',
    },
    {
        icon: <Dumbbell size={20} />,
        text: 'Create and manage your own exercises',
    },
    {
        icon: <Timer size={20} />,
        text: 'Interval timer with auto phase transitions',
    },
];

const stack = ['React', 'Vite', 'Node.js', 'Express', 'MongoDB'];

const AboutPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>About IntervalFlow</h1>
                <p className={styles.subtitle}>
                    A web app for building and running interval workouts — no
                    account required.
                </p>

                <div className={styles.features}>
                    {features.map((f, i) => (
                        <div key={i} className={styles.feature}>
                            {f.icon}
                            <span>{f.text}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.stack}>
                    <p className={styles.stackLabel}>Built with</p>
                    <div className={styles.tags}>
                        {stack.map((t) => (
                            <span key={t} className={styles.tag}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutPage;
