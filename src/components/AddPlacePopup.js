import React from 'react';
import { useEffect, useState } from 'react';
import { useFormValidator } from "../utils/useFormValidator";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const { checkValidation, resetValidation, isValid, errorMessages } = useFormValidator();

    useEffect(() => {
        setName('');
        setLink('');
        if (isOpen)
            resetValidation();
    }, [isOpen, resetValidation]);

    function handleNameChange(evt) {
        setName(evt.target.value);
        checkValidation(evt);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
        checkValidation(evt);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            title='Новое место'
            name='add-card'
            textButton={isLoading ? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValidForm={isValid}>
            <input minLength="2" maxLength="30" id="cardName-input" className={`popup__input popup__input_card_name
                   ${errorMessages.cardName && 'popup__input_status_error'}`}
                   type="text" placeholder="Название" name="cardName" required onChange={handleNameChange}
                   value={name}/>
            <span className={`popup__input-error cardName-input-error
                   ${errorMessages.cardName && 'popup__input-error_active'}`}>
                {errorMessages.cardName}
            </span>
            <input id="cardLink-input" className={`popup__input popup__input_card_link
                   ${errorMessages.cardLink && 'popup__input_status_error'}`} type="url"
                   placeholder="Ссылка на картинку" name="cardLink" required onChange={handleLinkChange}
                   value={link}/>
            <span className={`popup__input-error cardLink-input-error
                   ${errorMessages.cardLink && 'popup__input-error_active'}`}>
                {errorMessages.cardLink}
            </span>
        </PopupWithForm>
    )
}
