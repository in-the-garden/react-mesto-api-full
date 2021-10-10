import logo from '../images/header-logo.svg';
import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

export function Header(props) {
    return (
        <header className="header">
            <Switch>
                <Route exact path="/">
                    <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
                    <div className="header__info">
                        <h2 className="header__email">{props.email}</h2>
                        <button className="header__button" onClick={props.signOut}>Выйти</button>
                    </div>
                </Route>
                <Route path="/sign-up">
                    <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
                    <Link to="/sign-in" className="header__button">Вход</Link>
                </Route>
                <Route path="/sign-in">
                    <img className="header__logo" src={logo} alt="Логотип проекта Место"/>
                    <Link to="/sign-up" className="header__button">Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}