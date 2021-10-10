import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function ConfirmDeletePopup(props) {
    function handleSubmit(evt) {
        evt.preventDefault();
        props.onCardDelete(props.deletedCard);
    }

    return(
        <PopupWithForm 
            name={"card-dlt"} 
            title={"Вы уверены?"} 
            buttonText={"Да"} 
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}/>
    )
}