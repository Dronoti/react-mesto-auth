import React from "react";
import { useEffect } from 'react';
import { useFormValidator } from "../utils/useFormValidator";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const avatarRef = React.useRef();
    const { checkValidation, resetValidation, isValid, errorMessages } = useFormValidator();

    useEffect(() => {
        avatarRef.current.value = '';
        if (isOpen)
            resetValidation();
    }, [isOpen, resetValidation]);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='update-avatar'
            textButton={isLoading ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValidForm={isValid}>
            <input id="avatarLink-input" className={`popup__input popup__input_avatar_link
                   ${errorMessages.avatarLink && 'popup__input_status_error'}`} type="url"
                   placeholder="Ссылка на картинку" name="avatarLink" ref={avatarRef}
                   onChange={checkValidation} required/>
            <span className={`popup__input-error avatarLink-input-error
                   ${errorMessages.avatarLink && 'popup__input-error_active'}`}>
                {errorMessages.avatarLink}
            </span>
        </PopupWithForm>
    )
}
