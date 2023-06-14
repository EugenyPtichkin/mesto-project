import { profileId } from '../index.js';
import { openPopup, closePopup, popupDelete, handleDeleteAccept } from './modal.js';
import { api } from './Api.js';

// Ссылка на zoom окна карточки и свойства картинки в zoom`е находятся однократно
const zoomPopup = document.querySelector('.popup_zoom');
const zoomImage = zoomPopup.querySelector('.popup__zoom-image');
const zoomTitle = zoomPopup.querySelector('.popup__zoom-title');

export class Card {
  constructor({ placeValue, linkValue, cardId, cardLikes, cardOwner, apiLikeAdder, apiLikeDeleter, apiCardDeleter }, cardTemplateSelector) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._placeValue = placeValue;
    this._linkValue = linkValue;
    this._cardId = cardId;
    this._cardLikes = cardLikes;
    this._cardOwner = cardOwner;
    this._apiLikeAdder = apiLikeAdder;    //ссылка на функцию другого класса Api для слабого связывания
    this._apiLikeDeleter = apiLikeDeleter;//ссылка на функцию другого класса Api для слабого связывания
    this._apiCardDeleter = apiCardDeleter;//ссылка на функцию другого класса Api для слабого связывания
  }

  //приватные методы
  //функция отображения активных лайков, если при открытии страницы уже есть лайк от текущего пользователя
  _checkPreviousLikes(profileId) {
    const myLikeFound = this._cardLikes.some((item) => {
      return item._id === profileId;
    });
    if (myLikeFound) {
      this._element.querySelector('.card__like').classList.add('card__like-active');
    }
  }

  //функция добавления лайка на сервере и локально
  _likeAdd(evt) {
    api.addLike(this._cardId)    //сильное связывание с Api работает
      //this._apiLikeAdder(this._cardId) //теряется контекст при слабом связывании
      .then((result) => {
        //обновляем элемент на странице после успешного ответа с сервера
        this._element.querySelector('.card__like-value').textContent = result.likes.length;
        evt.target.classList.add('card__like-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });

  }

  //функция удаления лайка на сервере и локально
  _likeDelete(evt) {
    api.deleteLike(this._cardId)    //сильное связывание с Api работает
      //this._apiLikeDeleter(this._cardId)  //теряется контекст при слабом связывании
      .then((result) => {
        //обновляем элемент на странице после успешного ответа с сервера
        this._element.querySelector('.card__like-value').textContent = result.likes.length;
        evt.target.classList.remove('card__like-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });

  }

  //функция обработчика лайков на сервере при появлении новой карточки
  _likeEventListener() {
    this._element.querySelector('.card__like').addEventListener("click", (evt) => {

      //При клике по сердечку анализируем его состояние на странице и добавляем или снимаем лайк на сервере
      if (!evt.target.classList.contains('card__like-active')) {
        this._likeAdd(evt);
      }
      else {
        this._likeDelete(evt);
      }
    });
  }

  //функция удаления карточки на сервере и локально
  _cardDelete(evt, popupDelete) {
    //послать запрос на удаление с сервера  
    api.deleteCard(this._cardId)   //сильное связывание с Api работает
      //this._apiCardDeleter(this._cardId) //теряется контекст при слабом связывании
      .then((result) => {
        console.log(result);
        //закрыть модальное окно после успешного ответа от сервера
        closePopup(popupDelete);
        //удалить из DOM карточку локально после успешного ответа от сервера                
        evt.target.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }

  //функция обработчика удаления для своих карточек
  _deleteOwnCardListener(profileId, popupDelete) {
    if (this._cardOwner._id === profileId) {
      this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
        //открыть попап подтверждения удаления
        openPopup(popupDelete);

        handleDeleteAccept() //ожидаем промис после подтверждения нажатия клавиши
          .then(() => {
            this._cardDelete(evt, popupDelete);
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      });
    }
    else {
      //скрыть корзину на чужих карточках 
      this._element.querySelector('.card__delete').classList.add('card__delete_hidden');
    }
  }

  //функция обработчика открытия zoom карточки по нажатию на картинку 
  _handleCardClick() {
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
      zoomImage.src = evt.target.closest('.card__image').src;
      zoomImage.alt = evt.target.closest('.card__image').alt;
      zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
      openPopup(zoomPopup);
    });
  }

  _getTemplate() { //копируем содержимое из темплейта    
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content;

    const cardElement = cardTemplate
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //публичный метод
  createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._linkValue;
    this._image.alt = `img = ${this._placeValue}`;
    this._text = this._element.querySelector('.card__text');
    this._text.textContent = this._placeValue;
    this._cardLikeValue = this._element.querySelector('.card__like-value');
    this._cardLikeValue.textContent = this._cardLikes.length;

    this._checkPreviousLikes(profileId);
    this._likeEventListener();
    this._deleteOwnCardListener(profileId, popupDelete);
    this._handleCardClick();

    return this._element;
  }
}

/*
// --------------------------------------------------------
// -- Функция добавления карточки со всеми обработчиками --
// --------------------------------------------------------
export function createCard(placeValue, linkValue, cardId, cardLikes, cardOwner) {
  //копируем содержимое из темплейта
  const cardTemplate = document.querySelector('#card-template').content;

  if (linkValue) { //добавить карточку если ссылка непустая
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
    cardElement.querySelector('.card__text').textContent = placeValue;
    cardElement.querySelector('.card__like-value').textContent = cardLikes.length;

    //Если при открытии страницы уже есть лайки от текущего пользователя, то отобразить эти лайки как активные
    const myLikeFound = cardLikes.some((item) => {
      return item._id === profileId;
    });
    if (myLikeFound) {
      cardElement.querySelector('.card__like').classList.add('card__like-active');
    }

    //При появлении новой карточки вешаем ей обработчик лайков на сервере
    cardElement.querySelector('.card__like').addEventListener("click", function (evt) {

      //При клике по сердечку анализируем его состояние на странице и добавляем или снимаем лайк на сервере
      if (!evt.target.classList.contains('card__like-active')) {
        api.addLike(cardId)
          .then((result) => {
            //обновляем элемент на странице после успешного ответа с сервера
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
            evt.target.classList.add('card__like-active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
      else {
        api.deleteLike(cardId)
          .then((result) => {
            //обновляем элемент на странице после успешного ответа с сервера
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
            evt.target.classList.remove('card__like-active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
    });

    //Если карточка наша, разрешаем ее удаление и вешаем ей обработчик удаления карточки
    if (cardOwner._id === profileId) {
      cardElement.querySelector('.card__delete').addEventListener('click', function (event) {
        //открыть попап подтверждения удаления
        openPopup(popupDelete);

        handleDeleteAccept() //ожидаем промис после подтверждения нажатия клавиши
          .then(() => {
            //послать запрос на удаление с сервера  
            api.deleteCard(cardId)
              .then((result) => {
                console.log(result);
                //закрыть модальное окно после успешного ответа от сервера
                closePopup(popupDelete);
                //удалить из DOM карточку локально после успешного ответа от сервера                
                event.target.closest('.card').remove();
              })
              .catch((err) => {
                console.log(err); // выводим ошибку в консоль
              });
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      });
    }
    else {
      //скрыть корзину на чужих карточках 
      cardElement.querySelector('.card__delete').classList.add('card__delete_hidden');
    }

    //При появлении новой карточки вешаем ей обработчик открытия zoom карточки по нажатию на картинку 
    //передаем информацию для отображения
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
      zoomImage.src = evt.target.closest('.card__image').src;
      zoomImage.alt = evt.target.closest('.card__image').alt;
      zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
      openPopup(zoomPopup);
    });

    return cardElement;
  }
  else {
    return '';
  }
}
*/
