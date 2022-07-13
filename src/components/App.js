import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';

export default function App() {
    const navigate = useNavigate();
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isStatusPopupOpen, setStatusPopupOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [cardIdToDelete, setCardIdToDelete] = useState('');
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isStatusOk, setStatusOk] = useState(false);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([info, initialCards]) => {
                    setCurrentUser(info);
                    setCards(initialCards);
                })
                .catch(err => alert(err));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const onEscKeydown = (evt) => {
            if (evt.key === 'Escape') {
                evt.preventDefault();
                closeAllPopups();
            }
        }

        if (isEditProfilePopupOpen || isAddPlacePopupOpen || isStatusPopupOpen
            || isEditAvatarPopupOpen || selectedCard._id || cardIdToDelete)
            document.addEventListener('keydown', onEscKeydown);

        return () => document.removeEventListener('keydown', onEscKeydown);
    }, [isEditProfilePopupOpen,isAddPlacePopupOpen, isEditAvatarPopupOpen,
              selectedCard, cardIdToDelete, isStatusPopupOpen]);

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then(res => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('jwt');
                });
        }
    }

    function handleCardLike(card, isLiked) {
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => alert(err));
    }

    function handleCardDelete(cardId) {
        setLoading(true);
        api.deleteCard(cardId)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== cardId));
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => setLoading(false));
    }

    function handleUpdateUser(userInfo) {
        setLoading(true);
        api.patchUserInfo(userInfo)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => setLoading(false));
    }

    function handleUpdateAvatar(userAvatar) {
        setLoading(true);
        api.patchUserAvatar(userAvatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => setLoading(false));
    }

    function handleAddPlaceSubmit(card) {
        setLoading(true);
        api.postNewCard(card)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => alert(err))
            .finally(() => setLoading(false));
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleButtonDeleteClick(cardId) {
        setCardIdToDelete(cardId);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setStatusPopupOpen(false);
        setSelectedCard({});
        setCardIdToDelete('');
    }

    function handleRegister(registerData) {
        setLoading(true);
        auth.register(registerData)
            .then(res => {
                if (res.data)
                    setStatusOk(true);
                else
                    setStatusOk(false);
                setStatusPopupOpen(true);
            })
            .catch((err) => {
                setStatusOk(false);
                setStatusPopupOpen(true);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }

    function handleLogin(loginData) {
        setLoading(true);
        auth.authorize(loginData)
            .then(res => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                    setEmail(loginData.email);
                    setLoggedIn(true);
                } else {
                    setStatusOk(false);
                    setStatusPopupOpen(true);
                }
            })
            .catch((err) => {
                setStatusOk(false);
                setStatusPopupOpen(true);
                console.log(err);
            })
            .finally(() => setLoading(false));
    }

    function signOut() {
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
          <Header
              email={email}
              isLoggedIn={isLoggedIn}
              signOut={signOut}
          />
          <Routes>
              <Route
                  path='/'
                  element={
                  <ProtectedRoute
                      isLoggedIn={isLoggedIn}>
                      <Main
                          onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onCardClick={handleCardClick}
                          cards={cards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleButtonDeleteClick}
                      />
                      <Footer />
                  </ProtectedRoute>}
              />
              <Route
                  path='/sign-in'
                  element={isLoggedIn
                      ? <Navigate to='/' />
                      : <Login
                          isLoading={isLoading}
                          onLogin={handleLogin}
                          isStatusOk={isStatusOk}
                      />}
              />
              <Route
                  path='/sign-up'
                  element={isLoggedIn
                      ? <Navigate to='/' />
                      : <Register
                          isLoading={isLoading}
                          onRegister={handleRegister}
                          isStatusOk={isStatusOk}
                      />}
              />
          </Routes>
          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
          />
          <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
          />
          <PopupWithConfirmation
              cardId={cardIdToDelete}
              onDelete={handleCardDelete}
              onClose={closeAllPopups}
              isLoading={isLoading}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
          />
          <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
          />
          <InfoTooltip
              isOpen={isStatusPopupOpen}
              onClose={closeAllPopups}
              isSuccess={isStatusOk}
              validText={'Вы успешно зарегистрировались!'}
              invalidText={'Что-то пошло не так! Попробуйте ещё раз.'}
          />
      </CurrentUserContext.Provider>
    );
}
