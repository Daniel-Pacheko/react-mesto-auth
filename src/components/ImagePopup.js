function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup_increase ${card.link && 'popup_is-open'}`}>
            <div className="popup__content-increase">
                <button type="button" className="popup__close" aria-label="закрыть" onClick={onClose}></button>
                <img className="popup__photo-increase"
                    src={card.link}
                    alt={card.name} />
                <h2 className="popup__title-increase">{card.name}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;