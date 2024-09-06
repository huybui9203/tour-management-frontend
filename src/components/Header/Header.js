import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/images/logo.png'
import { FaBeer } from "react-icons/fa";
const Header = () => {
    return (
        <div className='flex items-center'>
            <FaBeer />
            <img className='w-32' src={'./tour-logo.png'} alt="logo"/>
            <NavLink to={'/'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Home </NavLink>
            <NavLink to={'/tour'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Tour</NavLink>

            <NavLink to={'/hotel'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Hotel</NavLink>

            <NavLink to={'/restaurant'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Restaurant</NavLink>
            <NavLink to={'/login'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Login</NavLink>
                <NavLink to={'/register'} className={({isActive}) => {
                return isActive ? "text-red-500" : ''
            }}>Register</NavLink>
            
        </div>
    )
}
export default Header