import React from "react";
import { NavLink } from "react-router-dom";
import './header.css';

const Header = (props) => {

    const setModalTrue = () => {
        props.setModalVisible(true);
    }

    const setModalFalse = () => {
        props.setModalVisible(false);
    }

    return (
        <header className='header'>
            <NavLink className='header-link' exact={true} to=''>HOME</NavLink>
            <NavLink className='header-link' to='/shows' onClick={setModalFalse}>SHOWS</NavLink>
            <NavLink className='header-link' to='/favorites' onClick={setModalTrue}>FAVORITES</NavLink>
            <NavLink className='header-link' to='/people' onClick={setModalTrue}>PEOPLE</NavLink>
            <NavLink className='header-link' to='/friends' onClick={setModalTrue}>FRIENDS</NavLink>
            <NavLink className='header-link' to='/world'>WORLD?</NavLink>
            {props.isLogin ? (
                <NavLink className='header-link' to='/profile'>PROFILE</NavLink>
            ) : (
                <NavLink className='header-link' to='/login'>LOGIN</NavLink>
            )
            }


        </header>
    )
}

export default Header;