import { NavLink } from 'react-router-dom';
import { User, Dumbbell, Timer, Layers } from 'lucide-react';
import styles from './Navigation.module.css';

export function Navigation() {
    // navItems is re-created every render with JSX icons — move outside the component
    // and store Icon component refs instead (same pattern as AboutPage)
    const navItems = [
        {
            name: 'Exercises',
            path: '/exercises',
            icon: <Dumbbell />,
            disabled: false,
        },
        {
            name: 'Timer',
            path: '/timer',
            icon: <Timer />,
            disabled: false,
        },
        {
            name: 'Trainings',
            path: '/trainings',
            icon: <Layers />,
            disabled: true,
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <User />,
            disabled: false,
        },
    ];

    return (
        <>
            {/* Fragment is redundant — <nav> is already a single root element */}
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    {navItems.map((item) => (
                        <li className={styles.navItem} key={item.path}>
                            {item.disabled ? (
                                <span
                                    className={styles.navLinkDisabled}
                                    aria-disabled="true"
                                >
                                    <div className={styles.iconWrapper}>
                                        {item.icon}
                                        <span className={styles.navText}>
                                            {item.name}
                                        </span>
                                    </div>
                                </span>
                            ) : (
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive
                                            ? styles.navLinkActive
                                            : styles.navLink
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
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
