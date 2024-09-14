import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/logo-primary.png';
import { FaBeer } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.headerContainer}>
            <div className='flex justify-between items-center w-[1156px]'>
                <img className={styles.logo} src={logo} alt="logo" />
                <button className={styles.menuButton} onClick={toggleMenu}>
                    Menu
                </button>
                <div className={`${styles.navLinks} ${isOpen ? styles.show : ''}`}>
                    <NavLink to={'/'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>Home</NavLink>
                    {/* <NavLink to={'/tour'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}> */}
                        {/* About
                        <ul className={styles.navLink_items}>
                        <li className={styles.navLink_item}>OverView</li>
                        <li className={styles.navLink_item}>Our team</li>
                        <li className={styles.navLink_item}>History</li>
                        </ul> */}
                    {/* </NavLink> */}
                    <NavLink to={'/tour'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>Tour</NavLink>
                    <NavLink to={'/destinations'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>Điểm đến</NavLink>
                    <NavLink to={'/login'} className={({ isActive }) => (isActive ? styles.activeLink : styles.navLink)}>Log in</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Header;