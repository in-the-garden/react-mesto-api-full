import React from 'react';
import closeIcon from '../images/close-icon.svg';

export function PopupWithForm(props) {
    return (
        <div className={`popup popup_form_${props.name} ${props.isOpen ? 'popup_is-opened' : ''}`}>
            <form className={`popup__form popup__form_submit_${props.name}`} name={`${props.name}`} onSubmit={props.onSubmit}>
                <button className={`popup__close popup__close_btn_${props.name}`} type="button" onClick={props.onClose}><img className="popup__close-icon" src={closeIcon} alt="Кнопка закрыть"/></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
                <button className="popup__save" type="submit">{props.buttonText}</button>
            </form>
        </div> 
    )
}