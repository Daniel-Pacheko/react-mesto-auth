import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value/* Значение инпута, полученное с помощью рефа */,
        });
    }
    useEffect(() => {
        avatarRef.current.value = ''
    }, [isOpen])
 
    return (
        <PopupWithForm
            name="type_avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input className="popup__input popup__input_type_img-avatar" ref={avatarRef} type="url" name="avatar" id="avatar"
                placeholder="Ссылка на фотографию" required />
            <span className="popup__input-error popup__input-error_title" id="avatar-error">#</span>
        </PopupWithForm>

    )
}

export default EditAvatarPopup;