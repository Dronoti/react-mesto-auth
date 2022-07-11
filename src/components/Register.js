import React from 'react';
import { useEffect, useState } from 'react';
import { useFormValidator } from '../utils/useFormValidator';
import { Link } from 'react-router-dom';
import ScreenWithForm from "./ScreenWithForm";

export default function Register({isLoading, onRegister, isStatusOk}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { checkValidation, resetValidation, isValid, errorMessages } = useFormValidator();
    const regCaption = (
        <p className='form__caption'>Уже зарегистрированы?
            <Link to="/sign-in" className="form__link"> Войти</Link>
        </p>
    );

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister({
            email,
            password
        });
    }

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

    return (
        <ScreenWithForm
            title='Регистрация'
            name='register'
            textButton={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            onSubmit={handleSubmit}
            isValidForm={isValid}
            regCaption={regCaption}>
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