import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function PopupWithConfirmation({cardId, onClose, onDelete, isLoading}) {
    function handleSubmit(evt) {
        evt.preventDefault();
        onDelete(cardId);
    }

    return (
        <PopupWithForm
            title='Вы уверены?'
            name='confirm'
            textButton={isLoading ? 'Удаление...' : 'Да'}
            isOpen={cardId}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValidForm={true}>
        </PopupWithForm>
    );
}
