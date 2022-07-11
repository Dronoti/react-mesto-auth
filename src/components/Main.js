import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Изображение профиля"/>
                    <button
                        className="profile__avatar-button"
                        type="button"
                        onClick={props.onEditAvatar}>
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__first-line">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}>
                </button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map(card => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />))}
                </ul>
            </section>
        </main>
    );
}
