import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const nameRef = useRef('');
    const linkRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: nameRef.current.value,/* Значение инпута, полученное с помощью рефа */
            link: linkRef.current.value/* Значение инпута, полученное с помощью рефа */
        });
    }

    useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            submit="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

            <input required minLength="2" maxLength="30" type="text" name="name" id="title-card"
                className="popup__input popup__input_type_title" placeholder="Название" ref={nameRef} />
            <span id="title-card-error" className="popup__input-error popup__input-error_title"></span>
            <input required type="url" name="link" id="link-card" className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку" ref={linkRef}/>
            <span id="link-card-error" className="popup__input-error popup__input-error_description"></span>
        </PopupWithForm>

    )
}

export default AddPlacePopup;