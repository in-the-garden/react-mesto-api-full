import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function AddPlacePopup(props) {
    const [cardName, setCardName] =React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeCardName(evt) {
        setCardName(evt.target.value);
    };

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onChangeButtonText();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace ({
            name: cardName,
            link,
          });
    }
    
    React.useEffect(() => {
        setCardName('');
        setLink('');
    }, [props.isOpen]);

    return(
        <PopupWithForm 
            name={"place"} 
            title={"Новое место"} 
            buttonText={`${props.buttonText ? 'Сохранение...' : 'Сохранить'}`} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}>
            <input 
                id="place-title" 
                className="popup__input popup__input_place_title" 
                type="text" 
                name="name" 
                placeholder="Название" 
                value={cardName}
                onChange={handleChangeCardName}
                required/>
            <input 
                id="place-link" 
                className="popup__input popup__input_place_link" 
                type="url" 
                name="link" 
                placeholder="Ссылка на картинку" 
                value={link}
                onChange={handleChangeLink}
                required/>
        </PopupWithForm>
    )
}