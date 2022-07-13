export default function ScreenWithForm(props) {
    return (
        <div className="form">
            <h2 className="popup__title form__title">{props.title}</h2>
            <form className="popup__form form__container" name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                <button className={`popup__save form__button ${!props.isValidForm && 'form__button_inactive'}`}
                        type="submit" disabled={!props.isValidForm} name="buttonSubmit">
                    {props.textButton}
                </button>
                {props.regCaption}
            </form>
        </div>
    );
}
