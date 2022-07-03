import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        ` ${isOwn ? 'list__place-delete' : 'list__place-delete_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        ` list__place-like ${isLiked ? 'list__place-like_active' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card._id);
    }

    return (
        <div id="card" className="template">
            <li className="list__place">
                <img className="list__place-photo"
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick} />

                <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="удалить"></button>
                <div className="list__caption">
                    <h2 className="list__place-title">{card.name}</h2>
                    <div className="list__place-description">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} ></button>
                        <p className="list__place-counter">{card.likes.length}</p>
                    </div>

                </div>
            </li>
        </div>
    )
}

export default Card;