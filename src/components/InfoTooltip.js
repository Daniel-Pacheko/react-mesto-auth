import React from "react";
import success from "../images/Icon-yes.svg";
import fail from "../images/Icon-no.svg";

function InfoTooltip({ isOpen, onClose, type }) {
  return (
    <div className={`popup ${isOpen && 'popup_is-open'}`}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}></button>
        <div className="popup__status-container">
          <img className="popup__tooltip-image" src={type ? success : fail} />
          <p className="popup__tooltip-title">
            {type
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip; 