import React from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content"> 
            <section className="profile">
                <div className="profile__personal-info">
                    <button 
                        type="button" 
                        className="profile__edit-avatar-button" 
                        onClick={props.onEditAvatar}>
                            <img 
                                className="profile__avatar" 
                                src={currentUser.avatar} 
                                alt="Аватар"/>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button 
                            type="button" 
                            className="profile__edit-button" 
                            onClick={props.onEditProfile}>
                        </button>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map(cardData => <Card card={cardData} key={cardData._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
            </section>
        </main>
    )
    
}