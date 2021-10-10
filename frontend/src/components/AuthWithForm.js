import React from 'react';
import { Link } from 'react-router-dom';

export function AuthWithForm(props) {
    return(
        <div className="auth">
            <form className="auth__form" onSubmit={props.onSubmit}>
                <h2 className="auth__title">{props.title}</h2>
                {props.children}
                <button className="auth__btn" type="submit">{props.buttonText}</button>
                <Link className={`auth__link ${!props.link ? props.class : ''}`} to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
       </div>
    )
}