import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [userName, setUserName] = useState('');
    const [userJob, setUserJob] = useState('');

    function handleNameChange(e) {
        setUserName(e.target.value);
    }

    function handleJobChange(e) {
        setUserJob(e.target.value);
    }

    useEffect(() => {
        setUserName(currentUser.name);
        setUserJob(currentUser.about);
    }, [currentUser, isOpen])

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: userName,
            about: userJob,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        > 

            <input required minLength="2" maxLength="40" type="text" name="name" id="name-profile"
                placeholder="Имя" className="popup__input popup__input_type_name"
                value={userName || ''} onChange={handleNameChange} />
            <span id="name-profile-error" className="popup__input-error popup__input-error_title">#</span>
            <input required minLength="2" maxLength="200" type="text" name="about" id="job-profile"
                placeholder="О себе" className="popup__input popup__input_type_job"
                value={userJob || ''} onChange={handleJobChange} />
            <span id="job-profile-error" className="popup__input-error popup__input-error_description">#</span>
        </PopupWithForm>

    )
}

export default EditProfilePopup; 
