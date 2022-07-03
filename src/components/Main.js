import {useContext} from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar}
                        alt="Здесь должен быть аватар пользователя" />
                    <button className="profile__icon-btn" type="submit" aria-label="редактировать аватар" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button type="button" className="profile__button-edit" aria-label="редактировать профель" onClick={onEditProfile}></button>
                    <h2 className="profile__subtitle">{currentUser.about}</h2>
                </div>
                <button type="button" className="profile__button-add" aria-label="добавить карточку" onClick={onAddPlace}></button>
            </section>

            <section className="lists">
                <ul className="list">
                    {cards.map((card) => (
                        <Card
                            key={card._id} 
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    )
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;