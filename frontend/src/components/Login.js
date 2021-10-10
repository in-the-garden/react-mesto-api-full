import React from 'react';
import { AuthWithForm } from './AuthWithForm';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';

export function Login(props) {
    const [logInfo, setlogInfo] = React.useState({email: '', password: ''})
    let history = useHistory();

    function handleChange(evt) {
        const {name, value} = evt.target;
        setlogInfo({...logInfo, [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = logInfo;
        auth.authorize(email, password).then((data) => {
            if(data.token) {
                props.handleLogin();
                history.push('/')
            } else {
                console.log('Error');
            }
        }).catch(err => console.log('Ошибка', err)
        )
    }

    return(
        <AuthWithForm title={"Вход"} buttonText={"Войти"} link={false} class={"hide"} onSubmit={handleSubmit}>
            <input className="auth__input" type="email" name="email" value={logInfo.email} onChange={handleChange} placeholder="Email" required/>
            <input className="auth__input" type="password" name="password" value={logInfo.password} onChange={handleChange} placeholder="Пароль" required/>
        </AuthWithForm>
    )
}