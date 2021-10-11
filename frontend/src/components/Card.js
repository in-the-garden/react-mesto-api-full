import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(like => like === currentUser._id);
    const cardLikeButtonClassName = `...`; 

    function handleClick() {
        props.onCardClick(props.card);
      }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
      
    return (
        <article className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__heart-counter">
                    <button type="button" className={`element__heart-button ${isLiked ? 'element__heart-button_active' : ''}`} onClick={handleLikeClick}></button>
                    <p className="element__counter">{props.card.likes.length}</p>
                </div>
            </div>
            <button type="button" className={`element__remove-button ${isOwn ? 'element__remove-button_visible' : 'element__remove-button_hidden'}`} onClick={handleDeleteClick}></button>
        </article>
    )
}
