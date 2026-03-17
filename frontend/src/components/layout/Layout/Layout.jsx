// import Header from './Header';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getRandomBackground } from '../../../utils/randomBackground';
// import styles from './Layout.module.css';
import { backgrounds } from '../../../utils/backgrounds';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  
    const [background, setBackground] = useState(backgrounds[0]);

    const location = useLocation();
    const prevBackgroundRef = useRef(background);

    useEffect(() => {
        const newBackground = getRandomBackground(backgrounds, prevBackgroundRef.current);
        prevBackgroundRef.current = newBackground;
        setBackground(newBackground);
    }, [location]);

    return (
        <div style={{ background, minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className={styles.layout}>
            {/* <Header /> */}
            <main >
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;