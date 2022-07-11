import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `elements__remove ${isOwn && 'elements__remove_visible'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `elements__button-like ${isLiked && 'elements__button-like_active'}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card, isLiked);
    }

    function handleDeleteClick() {
        onCardDelete(card._id);
    }

    return (
        <li className="elements__item">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <img
                className="elements__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}/>
            <div className="elements__info">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <span className="elements__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
}
