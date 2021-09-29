import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import './header.css';

const Header = (props) => {

    const [showMenu, setShowMenu] = useState(false);

    const setModalTrue = () => {
        props.setModalVisible(true);
    }

    const setModalFalse = () => {
        props.setModalVisible(false);
    }

    return (
        <header className='header'>
            <NavLink className='header-link desktop' exact={true} to=''>HOME</NavLink>
            <NavLink className='header-link desktop' to='/shows' onClick={setModalFalse}>SHOWS</NavLink>
            <NavLink className='header-link desktop' to='/favorites' onClick={setModalTrue}>FAVORITES</NavLink>
            <NavLink className='header-link desktop' to='/people' onClick={setModalTrue}>PEOPLE</NavLink>
            <NavLink className='header-link desktop' to='/friends' onClick={setModalTrue}>FRIENDS</NavLink>
            <NavLink className='header-link desktop' to='/recommendations' onClick={setModalTrue}>RECOMMENDATIONS</NavLink>
            {props.isLogin ? (
                <NavLink className='header-link desktop' to='/profile'>PROFILE</NavLink>
            ) : (
                <NavLink className='header-link desktop' to='/login'>LOGIN</NavLink>
            )
            }
            <button className={'button hidden-button'} onClick={() => setShowMenu(!showMenu)}>MENU</button>
            <div className={showMenu ? 'menu-active' : 'menu-hidden'}>
                <NavLink className='header-link' exact={true} to='' onClick={() => setShowMenu(false)}>HOME</NavLink>
                <NavLink className='header-link' to='/shows' onClick={() => {setModalFalse(); setShowMenu(false)}}>SHOWS</NavLink>
                <NavLink className='header-link' to='/favorites' onClick={() => {setModalTrue(); setShowMenu(false)}}>FAVORITES</NavLink>
                <NavLink className='header-link' to='/people' onClick={() => {setModalTrue(); setShowMenu(false)}}>PEOPLE</NavLink>
                <NavLink className='header-link' to='/friends' onClick={() => {setModalTrue(); setShowMenu(false)}}>FRIENDS</NavLink>
                <NavLink className='header-link' to='/recommendations' onClick={() => {setModalTrue(); setShowMenu(false)}}>RECOMMENDATIONS</NavLink>
                {props.isLogin ? (
                <NavLink className='header-link' to='/profile' onClick={() => setShowMenu(false)}>PROFILE</NavLink>
                ) : (
                    <NavLink className='header-link' to='/login' onClick={() => setShowMenu(false)}>LOGIN</NavLink>
                )
                }
            </div>
        </header>
    )
}

export default Header;