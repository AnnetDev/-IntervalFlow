import { useState } from 'react';
import AllExercises from '../../components/exercises/AllExercises/AllExercises';
import MyExercises from '../../components/exercises/MyExercises/MyExercises';
import Layout from '../../components/layout/Layout/Layout';
import styles from './ExercisesPage.module.css';

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState('my');

    return (
        <Layout>
            <div className={styles.exercisesPage}>
                <h1 className='visuallyHidden'>Exercises Page</h1>
                {/* Consider adding role="tablist" and role="tab" + aria-selected to improve accessibility */}
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
                        Exercise Library
                    </button>
                </div>

                {/* Switching tabs unmounts the inactive component, resetting scroll, filters, and re-fetching data.
                   To preserve state, render both and hide the inactive one with CSS (display: none). */}
                {activeTab === 'all' ? <AllExercises /> : <MyExercises onSwitchToAll={() => setActiveTab('all')} />}
            </div>
        </Layout>
    );
};

export default ExercisesPage;
