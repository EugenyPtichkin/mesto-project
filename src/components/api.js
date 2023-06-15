import { request } from './utils.js';

// ---------------
// -- Класс Api --
// ---------------
class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers
  }

  getUserInfo() {
    return request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    });
  }

  getInitialCards() {
    return request(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    });
  }

  changeUserInfo(newName, newAbout) {
    return request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    });
  }

  addNewCard(newName, newLink) {
    return request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    });
  }

  deleteCard(cardId) {
    return request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  addLike(cardId) {
    return request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    });
  }

  deleteLike(cardId) {
    return request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  changeAvatar(newAvatarLink) {
    return request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
  }

}

//экземпляр класса Api
export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '72c9f5e3-e302-4291-9e92-5cdf6c091286',
    'Content-Type': 'application/json'
  }
});