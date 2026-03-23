import { useState } from 'react';
import AllExercises from '../../components/exercises/AllExercises';
import MyExercises from '../../components/exercises/MyExercises';
import Layout from '../../components/layout/Layout/Layout';
import styles from './ExercisesPage.module.css';

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <Layout>
            <div className={styles.exercisesPage}>
                <h1 className='visuallyHidden'>Exercises Page</h1>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'my' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('my')}
                    >
                        My Exercises
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Exercises
                    </button>
                </div>

                {activeTab === 'all' ? <AllExercises /> : <MyExercises />}
            </div>
        </Layout>
    );
};

export default ExercisesPage;
