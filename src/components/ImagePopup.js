export default function ImagePopup({card, onClose}) {
    function stopPropagation(evt) {
        evt.stopPropagation();
    }

    return (
        <div className={`popup popup_type_show-card ${card._id && 'popup_opened'}`}
             onMouseDown={onClose}>
            <div className="popup__zoom-container" onMouseDown={stopPropagation}>
                <button className="popup__close" type="button" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name}/>
                <p className="popup__caption">{card.name}</p>
            </div>
        </div>
    );
}
