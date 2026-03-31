import { Github, Linkedin, Mail } from 'lucide-react';
import Layout from '../../components/layout/Layout/Layout';
import styles from './AuthorPage.module.css';
import avatarUrl from '../../assets/authorimg.jpg';

const AuthorPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <img src={avatarUrl} alt="Anna Baidikova" className={styles.avatar} />
                <h1 className={styles.name}>Anna Baidikova</h1>
                <p className={styles.role}>Fullstack Developer</p>
                <div className={styles.links}>
                    <a
                        href="https://github.com/AnnetDev"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        <Github size={18} />
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/anna-baidikova/"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.link}
                    >
                        <Linkedin size={18} />
                        LinkedIn
                    </a>
                    <a
                        href="mailto:anna.baidikova92@gmail.com"
                        className={styles.link}
                    >
                        <Mail size={18} />
                        Email
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default AuthorPage;
