import styles from './Navbar.module.css'

import { MenuItemsUserAtivo, MenuItemsUserInativo } from '../MenuItems/MenuItems'

import { FiMenu, FiX } from 'react-icons/fi'

import { Button } from '../Button/Button'

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
                {clicked ? <FiX className={styles.fa_times} /> : <FiMenu className={styles.fa_bars} />}
            </div>
            <ul className={clicked ? styles.nav_menu_active : styles.nav_menu}>
                {user && (
                    <>
                        {MenuItemsUserAtivo.map((item, index) => {
                            return (
                                <li key={index}><NavLink to={item.url} className={styles.nav_links}>{item.title}</NavLink></li>
                            )
                        }
                        )}
                        <li><Button onClick={logout} >Sair</Button> </li>
                        <li><NavLink to='/choose-avatar' className={styles.avatar}><ShowUserAvatar /></NavLink></li>
                    </>
                )}
                {!user && (
                    <>
                        {MenuItemsUserInativo.map((itemInativo) => {
                            return (
                                <li><NavLink to={itemInativo.url} className={styles.nav_links}>{itemInativo.title}</NavLink></li>
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