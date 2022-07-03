import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import DeletePopup from "./DeletePopup";
import * as auth from "../utils/auth";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isRegisterOk, setIsRegisterOk] = useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    const history = useHistory();
    const [userEmail, setUserEmail] = useState("dadadada@yandex.ru");
    const [deletedCard, setDeletedCard] = useState({});
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // create Error Api
    function errorApi(err) {
        console.log(`Ошибка: ${err}`);
    }

    useEffect(() => {
        api.getUserData()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })
            .catch(errorApi)
    }, [])

    useEffect(() => {
        api.getCards().then((Cards) => {
            setCards(Cards);
        })
            .catch(errorApi)
    }, []);

    //Проверяем токен
    useEffect(() => {
        tokenCheck();
    }, []);

    //Перенаправляем на главную страницу, если пользователь залогинен
    useEffect(() => {
        if (loggedIn) {
            history.push("/");
        }
    }, [loggedIn]);

    // Попап редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    // Попап редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    // Попап добавления карточки
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleDeleteCardPopup(deletedCard) {
        setDeletedCard(deletedCard);
        setIsDeletePopupOpen(true);
      }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeStatus(card._id, !isLiked).
            then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(errorApi);
    }

    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardId));
                closeAllPopups();
            })
            .catch(errorApi);
    };

    function handleUpdateUser(newUserInfo) {
        setLoading(true);
        api.setUserProfile(newUserInfo.name, newUserInfo.about)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(errorApi)
            .finally(() => setLoading(false));
    }

    function handleUpdateAvatar(newAvatar) {
        setLoading(true);
        api.setUserAvatar(newAvatar.avatar)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(errorApi)
            .finally(() => setLoading(false));
    }

    function handleAddPlaceSubmit(card) {
        setLoading(true);
        api.setCard(card.name, card.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(errorApi)
            .finally(() => setLoading(false));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsTooltipPopupOpen(false);
        setIsDeletePopupOpen(false);
    }

    //Регистрируем пользователя, открываем попап об успешной или не успешной регистрации
    function handleRegister({ email, password }) {
        auth
            .register(email, password)
            .then((res) => {
                if (res) {
                    setIsRegisterOk(true);
                    setIsTooltipPopupOpen(true);
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                setIsRegisterOk(false);
                setIsTooltipPopupOpen(true);
                console.log(err);
            });
    }

    //вход пользователя, устанавливаем почту, сохраняем токен
    function handleLogin({ email, password }) {
        auth
            .authorize(email, password)
            .then((res) => {
                const { token } = res;
                if (token) {
                    setLoggedIn(true);
                    setUserEmail(email);
                    localStorage.setItem("jwt", token);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //Выходим из системы, удаляем токен, перенаправляем на страницу входа
    function handleSignOut() {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        history.push("/sign-in");
    }

    //Проверяем токен, авторизируем пользователя, устанавливаем почту пользователя
    function tokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth
                .getContent(jwt)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setUserEmail(res.data.email);
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Header email={userEmail} onSignOut={handleSignOut} />

                    <Switch>
                        <ProtectedRoute
                            exact
                            path="/"
                            loggedIn={loggedIn}
                            component={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCardPopup}
                            cards={cards}
                        />

                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                        </Route>

                        <Route path="/sign-in">
                            <Login onLogin={handleLogin} />
                        </Route>

                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>

                    </Switch>

                    <Footer />

                    <DeletePopup
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        onDelete={handleCardDelete}
                        card={deletedCard}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoading={loading}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoading={loading}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                        isLoading={loading}
                    />

                    <InfoTooltip
                        isOpen={isTooltipPopupOpen}
                        onClose={closeAllPopups}
                        type={isRegisterOk}
                    />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );


}

export default App;
