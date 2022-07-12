import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';

export default function Header({email, isLoggedIn, signOut}) {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header__logo"></div>
            <nav className="header__nav">
                {isLoggedIn ? (
                    <>
                    <p className="header__email">{email}</p>
                    <button className="header__sign-out" onClick={signOut}>Выйти</button>
                    </>
                ) : (location.pathname === '/sign-in' && <NavLink className="header__link" to='/sign-up'>Регистрация</NavLink>)
                    || (location.pathname === '/sign-up' && <NavLink className="header__link" to='/sign-in'>Войти</NavLink>)}
            </nav>
        </header>
    );
}
