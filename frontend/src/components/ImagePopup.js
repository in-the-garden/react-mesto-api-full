import React from 'react';
import closeIcon from '../images/close-icon.svg';

export function ImagePopup(props) {
    return (
        <div className={`popup popup_form_images ${props.card.isOpen ? 'popup_is-opened' : ''}`}>
            <div className="popup__form popup__form_submit_image"> 
                <button className="popup__close popup__close_btn_image" type="button" onClick={props.onClose}><img className="popup__close-icon" src={closeIcon} alt="Кнопка закрыть"/></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name}/>
                <p className="popup__title-image">{props.card.name}</p>
            </div>
        </div>
    )
}