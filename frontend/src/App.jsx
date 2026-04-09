// Inconsistent export style across the codebase: pages and layout components use default exports,
// while common components (Button, Modal, Toast, Select, Input, Loader) and hooks use named exports.
// Pick one convention — named exports are generally preferred (better refactoring, no rename-on-import).
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ExercisesPage from './pages/ExercisesPage/ExercisesPage';
import TimerPage from './pages/TimerPage/TimerPage';
import TrainingsPage from './pages/TrainingsPage/TrainingsPage';
import SplashPage from './pages/SplashPage/SplashPage';
import AboutPage from './pages/AboutPage/AboutPage';
import AuthorPage from './pages/AuthorPage/AuthorPage';

function App() {
    return (
        <>
            {/* Fragments are reduntant <BrowserRouter> is already a single root element */}
            <BrowserRouter>
                {/* No catch-all 404 route — unknown paths render a blank Layout */}
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/exercises" element={<ExercisesPage />} />
                    <Route path="/timer" element={<TimerPage />} />
                    <Route path="/trainings" element={<TrainingsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/author" element={<AuthorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
