import styles from './Navbar.module.css'

import { MenuItemsUserAtivo, MenuItemsUserInativo } from '../MenuItems/MenuItems'

import { FiMenu, FiX } from 'react-icons/fi'

import React, { useState } from 'react'

import { NavLink } from "react-router-dom"

import { useAuthentication } from "../../hooks/useAuthentication"

import { useAuthValue } from "../../context/AuthContext"

import ShowUserAvatar from '../ShowUserAvatar/ShowUserAvatar'

const Navbar = () => {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
    }

    return (
        <nav className={styles.navbar_items}>
            <NavLink to="/" className={styles.navbar_logo}> Mini <span>Blog</span></NavLink>
            {/* Menu Mobile */}
            <div className={styles.menu_icon} onClick={handleClick}>
                {clicked ? <FiX className={styles.icon_fechar} /> : <FiMenu className={styles.icon_menu} />}
            </div>
            <ul className={clicked ? styles.nav_menu_active : styles.nav_menu}>
                {user && (
                    <>
                        {MenuItemsUserAtivo.map((item, index) => {
                            return (
                                <li key={index}><NavLink to={item.url} className={styles.nav_links} onClick={handleClick}>{item.title}</NavLink></li>
                            )
                        }
                        )}
                        <li className={styles.nav_links}> <button onClick={logout} className='btn' >Sair</button></li>
                        <li><NavLink to='/choose-avatar' className={styles.avatar}><ShowUserAvatar /></NavLink></li>
                    </>
                )}
                {!user && (
                    <>
                        {MenuItemsUserInativo.map((itemInativo) => {
                            return (
                                <li><NavLink to={itemInativo.url} className={styles.nav_links} onClick={handleClick}>{itemInativo.title}</NavLink></li>
                            )
                        }
                        )}
                    </>
                )}   
            </ul>

        </nav>
    )
}

export default Navbar