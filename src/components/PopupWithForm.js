export default function PopupWithForm(props) {
    function stopPropagation(evt) {
        evt.stopPropagation();
    }

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}
             onMouseDown={props.onClose}>
            <div className="popup__container" onMouseDown={stopPropagation}>
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className={`popup__save ${!props.isValidForm && 'popup__save_inactive'}`}
                            type="submit" disabled={!props.isValidForm} name="buttonSubmit">
                        {props.textButton}
                    </button>
                </form>
            </div>
        </div>
    );
}
