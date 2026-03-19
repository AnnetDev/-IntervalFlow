import { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import AllExercises from '../../components/exercises/AllExercises';
import MyExercises from '../../components/exercises/MyExercises';
import Layout from '../../components/layout/Layout/Layout';

const ExercisesPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    return (
        <Layout>

            <h1>Exercises Page</h1>
            {/* //add tabs */}
            <div>
                <Button
                    onClick={() => setActiveTab('all')}
                    disabled={activeTab === 'all'}
                >
                    All Exercises
                </Button>
                <Button
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
