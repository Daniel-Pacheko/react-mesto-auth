function PopupWithForm({ name, title, submit = 'Сохранить', isOpen, children, onClose, onSubmit }) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_is-open'}`}>
            <div className="popup__content">
                <button className="popup__close" type="button" aria-label="закрыть" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form
                    className={`"popup__form popup__form_${name}"`}
                    name="form-profile"
                    onSubmit={onSubmit}
                    noValidate >
                    {children}
                    <button className="popup__send" type="submit" >{submit}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
