import React from 'react';
import { PopupWithForm } from './PopupWithForm';

export function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onChangeButtonText();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
          });
        ;
    }

    React.useEffect(() => {
            avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm 
            name={"edit-ava"} 
            title={"Обновить аватар"} 
            buttonText={`${props.buttonText ? 'Сохранение...' : 'Сохранить'}`} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}>
            <input id="ava-link" 
                className="popup__input popup__input_ava_link" 
                type="url" 
                name="link" 
                ref={avatarRef} 
                placeholder="Ссылка на картинку" 
                required/>
        </PopupWithForm>
    )
}