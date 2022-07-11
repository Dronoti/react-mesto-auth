import { useState, useCallback } from 'react';

export function useFormValidator() {
    const [isValid, setValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});

    const checkValidation = useCallback(evt => {
        setErrorMessages(state => ({
            ...state,
            [evt.target.name]: evt.target.validationMessage
        }));

        setValid(evt.target.closest('.popup__form').checkValidity());
    }, []);

    const  resetValidation = useCallback(() => {
        setErrorMessages({});
        setValid(false);
    }, []);

    return { checkValidation, resetValidation, isValid, errorMessages }
}
