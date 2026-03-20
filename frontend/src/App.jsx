import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import TimerPage from './pages/TimerPage/TimerPage';
import TrainingsPage from './pages/TrainingsPage/TrainingsPage';
import SplashPage from './pages/SplashPage/SplashPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/timer" element={<TimerPage />} />
                    <Route path="/trainings" element={<TrainingsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
