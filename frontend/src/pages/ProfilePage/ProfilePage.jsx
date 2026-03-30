import { UserCircle, Database, Smartphone } from 'lucide-react';
import Layout from '../../components/layout/Layout/Layout';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    <UserCircle size={64} />
                </div>

                <h1 className={styles.title}>No account needed</h1>
                <p className={styles.subtitle}>
                    Start using IntervalFlow right away — no sign-up required.
                </p>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <Smartphone size={20} />
                        <span>Browse and filter the exercise library</span>
                    </div>
                    <div className={styles.feature}>
                        <Database size={20} />
                        <span>Add custom exercises, saved locally on this device</span>
                    </div>
                </div>

                <div className={styles.comingSoon}>
                    <span>User accounts — coming in a future version</span>
                </div>
            </div>
        </Layout>
    );
};

export default ProfilePage;
