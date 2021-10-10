import React from 'react';
import closeIcon from '../images/close-icon.svg';
import doneIcon from '../images/done-icon.svg'
import rejectedIcon from '../images/rejected-icon.svg'

export function InfoToolTip(props) {
    return(
        <div className={`popup ${props.status.open ? 'popup_is-opened' : ''}`}>
            <form className={`popup__form`}>
                <button className={`popup__close`} type="button" onClick={props.onClose}><img className="popup__close-icon" src={closeIcon} alt="Кнопка закрыть"/></button>
                <img className="popup__status-img" src={`${props.status.done ? doneIcon : rejectedIcon}`}/>
                <h2 className="popup__status-title">{`${props.status.done ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`}</h2>
            </form>
        </div> 
    )
}