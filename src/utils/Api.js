class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Загрузка информации о пользователе с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResult(res))
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => this._checkResult(res))
  }

  setUserProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
      .then(res => this._checkResult(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => this._checkResult(res))
  }



  setCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._checkResult(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResult(res));
  }


  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => this._checkResult(res))
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkResult(res))
  }

  changeLikeStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkResult(res))
  }

};



const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: '86559a47-cdf8-4862-a98f-377a7ae7e478',
    'Content-Type': 'application/json'
  }
});

export default api;