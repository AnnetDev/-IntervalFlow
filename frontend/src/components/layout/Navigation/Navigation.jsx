import { NavLink } from 'react-router-dom';
import { User, Dumbbell, Timer, Layers } from 'lucide-react';
import styles from './Navigation.module.css';

export function Navigation() {

    const navItems = [
        {
            name: 'Exercises',
            path: '/exercises',
            icon: <Dumbbell />,
            disabled: false,
        },
        {
            name: 'Trainings',
            path: '/trainings',
            icon: <Layers />,
            disabled: true,
        },
        {
            name: 'Timer',
            path: '/timer',
            icon: <Timer />,
            disabled: false
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <User />,
            disabled: true
        },
    ];

    return (
        <>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li className={styles.navItem} key={item.path}>
                            <NavLink
                                className={({ isActive }) =>
                                    item.disabled ? styles.navLinkDisabled : isActive ? styles.navLinkActive : styles.navLink
                                }
                                to={item.path}
                            >
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                    <span className={styles.navText}>
                                        {item.name}
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
