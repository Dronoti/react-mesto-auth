import React from 'react';
import { useEffect, useState } from 'react';
import { useFormValidator } from "../utils/useFormValidator";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);
    const { checkValidation, resetValidation, isValid, errorMessages } = useFormValidator();

    useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
        if (isOpen)
            resetValidation();
    }, [currentUser, isOpen, resetValidation]);

    function handleNameChange(evt) {
        setName(evt.target.value);
        checkValidation(evt);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
        checkValidation(evt);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description
        });
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit-profile'
            textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValidForm={isValid}>
            <input minLength="2" maxLength="40" id="profileName-input" className={`popup__input
                   popup__input_profile_name ${errorMessages.profileName && 'popup__input_status_error'}`}
                   type="text" placeholder="Имя" name="profileName"
                   required onChange={handleNameChange} value={name}/>
            <span className={`popup__input-error profileName-input-error
                   ${errorMessages.profileName && 'popup__input-error_active'}`}>
                {errorMessages.profileName}
            </span>
            <input minLength="2" maxLength="200" id="profileJob-input" className={`popup__input
                   popup__input_profile_job ${errorMessages.profileJob && 'popup__input_status_error'}`}
                   type="text" placeholder="О себе" name="profileJob"
                   required onChange={handleDescriptionChange} value={description}/>
            <span className={`popup__input-error profileJob-input-error
                   ${errorMessages.profileJob && 'popup__input-error_active'}`}>
                {errorMessages.profileJob}
            </span>
        </PopupWithForm>
    )
}
