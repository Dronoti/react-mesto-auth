import React from 'react';
import { useEffect, useState } from 'react';
import { useFormValidator } from '../utils/useFormValidator';
import ScreenWithForm from "./ScreenWithForm";

export default function Login({isLoading, onLogin, isStatusOk}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { checkValidation, resetValidation, isValid, errorMessages } = useFormValidator();

    useEffect(() => {
        if (isStatusOk)
            resetValidation();
    }, [isStatusOk, resetValidation]);

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
        checkValidation(evt);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
        checkValidation(evt);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({
            email,
            password
        });
    }

    return (
        <ScreenWithForm
            title='Вход'
            name='login'
            textButton={isLoading ? 'Вход...' : 'Войти'}
            onSubmit={handleSubmit}
            isValidForm={isValid}>
            <input id="email-input" className={`popup__input form__input
                   ${errorMessages.email && 'popup__input_status_error'}`}
                   type="email" placeholder="Email" name="email"
                   required onChange={handleEmailChange} value={email}/>
            <span className={`popup__input-error email-input-error
                   ${errorMessages.email && 'popup__input-error_active'}`}>
                {errorMessages.email}
            </span>
            <input minLength="6" id="password-input" className={`popup__input form__input
                   ${errorMessages.password && 'popup__input_status_error'}`}
                   type="password" placeholder="Пароль" name="password"
                   required onChange={handlePasswordChange} value={password}/>
            <span className={`popup__input-error password-input-error
                   ${errorMessages.password && 'popup__input-error_active'}`}>
                {errorMessages.password}
            </span>
        </ScreenWithForm>
    );
}
