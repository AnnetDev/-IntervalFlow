import { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import AllExercises from '../../components/exercises/AllExercises';
import MyExercises from '../../components/exercises/MyExercises';
import Layout from '../../components/layout/Layout/Layout';
import styles from './ExercisesPage.module.css';

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <Layout>

            <h1 className='visuallyHidden'>Exercises Page</h1>
            {/* //add tabs */}
            <div className={styles.tabs}>
                <Button className={activeTab === 'all' ? 'active' : ''}
                    onClick={() => setActiveTab('all')}
                    disabled={activeTab === 'all'}
                >
                    All Exercises
                </Button>
                <Button className={activeTab === 'my' ? 'active' : ''}
                    onClick={() => setActiveTab('my')}
                    disabled={activeTab === 'my'}
                >
                    My Exercises
                </Button>
            </div>

            {activeTab === 'all' ? <AllExercises /> : <MyExercises />}


        </Layout>
    );
};

export default ExercisesPage;
