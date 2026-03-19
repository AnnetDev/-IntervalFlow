import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import TimerPage from './pages/TimerPage/TimerPage';
import SplashPage from './pages/SplashPage/SplashPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/timer" element={<TimerPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
