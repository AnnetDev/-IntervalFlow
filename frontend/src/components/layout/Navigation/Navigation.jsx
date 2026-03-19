import { NavLink } from 'react-router-dom';
import { User, Dumbbell, Timer } from 'lucide-react';
import styles from './Navigation.module.css';

export function Navigation() {
    const navItems = [
        { name: 'Exercises', path: '/exercises', icon: <Dumbbell /> },
        { name: 'Timer', path: '/timer', icon: <Timer /> },
        { name: 'Profile', path: '/profile', icon: <User /> },
    ];

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li className={styles.navItem} key={item.path}>
                            <NavLink className={styles.navLink} to={item.path}>
                                {item.icon}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
