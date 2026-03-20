import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getRandomBackground } from '../../../utils/randomBackground';
import { backgrounds } from '../../../utils/backgrounds';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
    const [background, setBackground] = useState(
        () => getRandomBackground(backgrounds, null).css
    );

    const location = useLocation();
    const prevBackgroundRef = useRef(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const newBackground = getRandomBackground(
            backgrounds,
            prevBackgroundRef.current
        );
        prevBackgroundRef.current = newBackground;
        setBackground(newBackground.css);
    }, [location]);

    return (
        <div
            style={{
                background,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
            className={styles.layout}
        >
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
