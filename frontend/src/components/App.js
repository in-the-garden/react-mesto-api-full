import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../index.css';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { ConfirmDeletePopup } from './ConfirmDeletePopup';
import { ImagePopup } from './ImagePopup';
import { Register } from './Register';
import { Login } from './Login';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { ProtectedRoute } from './ProtectedRoute';
import * as auth from '../auth.js';
import { InfoToolTip } from './InfoToolTip';

export function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({name: '', link: '', isOpen: false});
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [deletedCard, setDeletedCard] = React.useState({});
    const [buttonText, setButtonText] = React.useState(false);

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [status, setStatus] = React.useState({open: false, done: true})

    let history = useHistory();  

    function handleLogin() {
        setLoggedIn(!loggedIn)
    }

    // Выход из учетной записи
    function signOut() {
        localStorage.removeItem('token');
        handleLogin();
        history.push('/sign-in');
    }

    // Проверка токена при обновлении страницы
    function tokenCheck() {
        const token = localStorage.getItem('token');

        if(token) {
            auth.getContent(token).then((res) => {
                if(res) {
                    setEmail(res.email);
                    setLoggedIn(true);
                    history.push('/')
                }
            }).catch(err => console.log('Ошибка', err)
            );
        }
    }

    // Открытие попапов
    function handleStatusClick({open, done}) {
        setStatus({open: open, done: done})
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleEditAvatarClick() { 
        setIsEditAvatarPopupOpen(true);
    };

    function handleCardClick(data) {
        setSelectedCard({name: data.name, link: data.link, isOpen: true});
    }

    function handleConfirmDeleteClick(card) {
        setIsConfirmDeletePopupOpen(true);
        setDeletedCard(card);
    }

    // Закрытие попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({name: '', link: '', isOpen: false});
        setIsConfirmDeletePopupOpen(false);
        setStatus({...status, open: false})
    }
    
    const handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            closeAllPopups();
        };
    }

    const handleOverlayClose = (evt)  => { 
        if (evt.target.classList.contains('popup')) { 
            closeAllPopups();  
        };
    }

    // Изменение текста кнопки submit
    function handleChangeButtonText() {
        setButtonText(true);
    }

    // Изменение данных пользователя в профиле
    function handleUpdateUser({ name, about }) {
        api.updateUserInfo(name, about).then((userInfo) => {
            setCurrentUser(userInfo);
            setIsEditProfilePopupOpen(false);
        }).catch(err => console.log('Ошибка', err)
        ).finally(() => {
            setButtonText(false);
        })
    }

    // Обновление аватара
    function handleUpdateAvatar({ avatar }) {
            api.changeAvatar(avatar).then((userInfo) => {
            setCurrentUser(userInfo);
            setIsEditAvatarPopupOpen(false);
        }).catch(err => console.log('Ошибка', err)
        ).finally(() => {
            setButtonText(false);
        })
    }

    // Добавление новой карточки на страницу
    function handleAddPlaceSubmit({name, link}) {
        api.loadNewCard(name, link).then((newCard) => {
            setCards([newCard, ...cards]);
            setIsAddPlacePopupOpen(false);
        }).catch(err => console.log('Ошибка', err)
        ).finally(() => {
            setButtonText(false);
        })
    }

    // Установка like карточке
    function handleCardLike(card) {
        const isLiked = card.likes.some(like => like === currentUser._id);

        if (!isLiked) {
            api.setLike(card).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log('Ошибка', err)
            );
        } else {
            api.deleteLike(card).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log('Ошибка', err)
            );
        }
    };

    // Удаление своей карточки со страницы
    function handleCardDelete(card) {
        api.deleteCard(card).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            setIsConfirmDeletePopupOpen(false);
        }).catch(err => console.log('Ошибка', err)
        );
    }

    // Закрытие попапов с помощью Esc и overlay
    React.useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mousedown', handleOverlayClose);
        return() =>{
            document.removeEventListener('keydown', handleEscClose);
            document.removeEventListener('mousedown', handleOverlayClose);
        }
    }, [])
    
    // Отрисовка инфо на странице
    React.useEffect(() => {
        if(loggedIn) {
            Promise.all([
                api.getUserInfo(),
                api.getInitialCards()
            ]).then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            }).catch(err => console.log('Ошибка', err)
            )
        }
    }, [loggedIn])

    // Проверка токена для отрисовки
    React.useEffect(() => {
        tokenCheck();
    }, [loggedIn])

    return (
        <div className="body">
            <div className="page body__container">
                <Header email={email} signOut={signOut} />
                <InfoToolTip status={status} onClose={closeAllPopups}/>
                <Switch>
                    <Route path="/sign-up">
                        <Register handleStatus={handleStatusClick} status={status}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login handleLogin={handleLogin}/>
                    </Route>
                    <CurrentUserContext.Provider value={currentUser}>
                        <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                            onEditProfile={handleEditProfileClick} 
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick} 
                            onCardClick={handleCardClick}
                            cards={cards}
                            onCardLike={handleCardLike}
                            onCardDelete={handleConfirmDeleteClick}/>
                        <EditProfilePopup 
                            isOpen={isEditProfilePopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateUser={handleUpdateUser}
                            onChangeButtonText={handleChangeButtonText}
                            buttonText={buttonText}/>
                        <AddPlacePopup 
                            isOpen={isAddPlacePopupOpen} 
                            onClose={closeAllPopups} 
                            onAddPlace={handleAddPlaceSubmit}
                            onChangeButtonText={handleChangeButtonText}
                            buttonText={buttonText}/>
                        <ConfirmDeletePopup
                            isOpen={isConfirmDeletePopupOpen}
                            onClose={closeAllPopups}
                            onCardDelete={handleCardDelete}
                            deletedCard={deletedCard}/>
                        <EditAvatarPopup 
                            isOpen={isEditAvatarPopupOpen} 
                            onClose={closeAllPopups} 
                            onUpdateAvatar={handleUpdateAvatar}
                            onChangeButtonText={handleChangeButtonText}
                            buttonText={buttonText}/>
                        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                    </CurrentUserContext.Provider>
                </Switch>
                <Footer />
            </div>
        </div>
  )
}

export default App;
