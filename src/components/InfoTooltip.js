import React from 'react';
// import { useHistory } from "react-router-dom";

export default function InfoTooltip({isOpen, onClose, isSuccess}) {
    // const history = useHistory();

    function stopPropagation(evt) {
        evt.stopPropagation();
    }

    function handleClose() {
        onClose();
        // if (isSuccess)
        //     history.push('/sign-in');
    }

    return (
        <div className={`popup ${isOpen && 'popup_opened'}`} onMouseDown={handleClose}>
            <div className="popup__container popup__container_status" onMouseDown={stopPropagation}>
                <button className="popup__close" type="button" onClick={handleClose}></button>
                <div className={`popup__status-logo
                ${isSuccess ? 'popup__status-logo_type_success' : 'popup__status-logo_type_fail'}`} />
                <h2 className="popup__title">{isSuccess ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    );
}
