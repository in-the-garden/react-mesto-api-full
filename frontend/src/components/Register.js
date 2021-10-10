import React from 'react';
import { AuthWithForm } from './AuthWithForm';
//import { InfoToolTip } from './InfoToolTip';
import { useHistory } from 'react-router-dom';
import * as auth from '../auth.js';
import { InfoToolTip } from './InfoToolTip';

export function Register(props) {
    const [regInfo, setRegInfo] = React.useState({email: '', password: ''})
    let history = useHistory();

    function handleChange(evt) {
        const {name, value} = evt.target;
        setRegInfo({...regInfo, [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        const { email, password } = regInfo;
        auth.register(email, password).then((res) => {
            if(res) {
                props.handleStatus({open: true, done: true})
                setTimeout(() => {
                    history.push('/sign-in')
                }, 2000)
            } else {
                props.handleStatus({open: true, done: false})
            }
        }).catch(err => console.log('Ошибка', err)
        )
    }

    return(
        <AuthWithForm title={"Регистрация"} buttonText={"Зарегистрироваться"} link={true} onSubmit={handleSubmit}>
            <input className="auth__input" type="email" name="email" value={regInfo.email} onChange={handleChange} placeholder="Email" required/>
            <input className="auth__input" type="password" name="password" value={regInfo.password} onChange={handleChange} placeholder="Пароль" required/>
        </AuthWithForm>
    )
}