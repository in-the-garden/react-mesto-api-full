import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

export function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onChangeButtonText();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
          });
    }

    return (
        <PopupWithForm 
            name={"profile"} 
            title={"Редактировать профиль"} 
            buttonText={`${props.buttonText ? 'Сохранение...' : 'Сохранить'}`} 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}>
            <input 
                id="info-name" 
                className="popup__input popup__input_info_name" 
                type="text" 
                name="name" 
                value={name || ''} 
                onChange={handleChangeName} 
                required/>
            <input 
                id="info-job" 
                className="popup__input popup__input_info_job" 
                type="text" 
                name="about" 
                value={description || ''} 
                onChange={handleChangeDescription} 
                required/>
        </PopupWithForm>
    )
}