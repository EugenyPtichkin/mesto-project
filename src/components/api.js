import { request } from './utils.js';
/*
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '72c9f5e3-e302-4291-9e92-5cdf6c091286',
    'Content-Type': 'application/json'
  }
}

// ----------------------------------- 
// -- Запрос пользователя с сервера -- 
// ----------------------------------- 
export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  });
};

// -------------------------------
// -- Запрос карточек с сервера --
// -------------------------------
export function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  });
};

// ---------------------------------------
// -- Редактирование профиля на сервере --
// ---------------------------------------
export function changeUserInfo(newName, newAbout) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
  });
};

// -----------------------------------------
// -- Добавление новой карточки на сервер --
// -----------------------------------------
export function addNewCard(newName, newLink) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  })
};

// ----------------------------------------
// -- Удаление своей карточки на сервера --
// ----------------------------------------
export function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

// ------------------------------------------
// -- Добавление лайка карточке на сервере --
// ------------------------------------------
export function addLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
}

// ----------------------------------------
// -- Удаление лайка карточки на сервере --
// ----------------------------------------
export function deleteLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

// ----------------------------------
// -- Изменение аватара на сервере --
// ----------------------------------
export function changeAvatar(newAvatarLink) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
}
*/

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

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '72c9f5e3-e302-4291-9e92-5cdf6c091286',
    'Content-Type': 'application/json'
  }
});