import { Navigation } from "../Navigation/Navigation";
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Navigation />
        </footer>
    );
}

export default Footer;