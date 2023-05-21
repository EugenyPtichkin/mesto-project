const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '72c9f5e3-e302-4291-9e92-5cdf6c091286',
    'Content-Type': 'application/json'
  }
}

/* ----------------------------------- */
/* -- Запрос пользователя с сервера -- */
/* ----------------------------------- */
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

/* ------------------------------- */
/* -- Запрос карточек с сервера -- */
/* ------------------------------- */
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

/* --------------------------------------- */
/* -- Редактирование профиля на сервере -- */
/* --------------------------------------- */
export const changeUserInfo = (newName, newAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName, 
      about: newAbout
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


/* ----------------------------------------- */
/* -- Добавление новой карточки на сервер -- */
/* ----------------------------------------- */
export const addNewCard = (newName, newLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

/* ---------------------------------------- */
/* -- Удаление своей карточки на сервера -- */
/* ---------------------------------------- */
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


/* ------------------------------------------ */
/* -- Добавление лайка карточке на сервере -- */
/* ------------------------------------------ */
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

/* ---------------------------------------- */
/* -- Удаление лайка карточки на сервере -- */
/* ---------------------------------------- */
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

/* ---------------------------------- */
/* -- Изменение аватара на сервере -- */
/* ---------------------------------- */
export const changeAvatar = (newAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
} 