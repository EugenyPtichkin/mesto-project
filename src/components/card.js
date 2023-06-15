//import { openPopup, closePopup, popupDelete, handleDeleteAccept } from './modal.js';

// Ссылка на zoom окна карточки и свойства картинки в zoom`е находятся однократно
//const zoomPopup = document.querySelector('.popup_zoom');
//const zoomImage = zoomPopup.querySelector('.popup__zoom-image');
//const zoomTitle = zoomPopup.querySelector('.popup__zoom-title');

export class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, cardTemplateSelector, profileId) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._placeValue = data.placeValue;
    this._linkValue = data.linkValue;
    this._cardId = data.cardId;
    this._cardLikes = data.cardLikes;
    this._cardOwner = data.cardOwner;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._profileId = profileId;
  }

  //приватные методы
  //функция отображения активных лайков, если при открытии страницы уже есть лайк от текущего пользователя
  _checkPreviousLikes() {
    const myLikeFound = this._cardLikes.some((item) => {
      return item._id === this._profileId;
    });
    if (myLikeFound) {
      this._cardLike.classList.add('card__like-active');
    }
    return myLikeFound;
  }
  /*
    //функция добавления лайка ТОЛЬКО локально - запрос на сервер вынесен в index.js
    _likeAdd() {
      api.addLike(this._cardId)    //сильное связывание с Api работает
      //this._apiLikeAdder(this._cardId) //теряется контекст при слабом связывании
        .then((result) => {
          //обновляем элемент на странице
          this._cardLikeValue.textContent = result.likes.length;
          this._cardLike.classList.add('card__like-active');
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
  
    //функция удаления лайка ТОЛЬКО локально - запрос на сервер вынесен в index.js
    _likeDelete() {
      api.deleteLike(this._cardId)    //сильное связывание с Api работает
      //this._apiLikeDeleter(this._cardId)  //теряется контекст при слабом связывании
        .then((result) => {
          //обновляем элемент на странице 
          this._cardLikeValue.textContent = result.likes.length;
          this._cardLike.classList.remove('card__like-active');
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    }
    */

  //функция удаления карточки ТОЛЬКО локально - запрос на сервер вынесен в index.js
  /*  _cardDelete(evt, popupDelete) {
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
    }*/

  //функция обработчика удаления для своих карточек - вынесена в index.js
  /* _deleteOwnCardListener(popupDelete) {
     if (this._cardOwner._id === this._profileId) {
       this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
         //открыть попап подтверждения удаления
         openPopup(popupDelete);
  
         handleDeleteAccept() //ожидаем промис после подтверждения нажатия клавиши
           .then(() => {
             //this._cardDelete(evt, popupDelete);            
             closePopup(popupDelete);  //закрыть модальное окно            
             this.element.remove();   //удалить из DOM карточку локально
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
   }*/

  //функция обработчика открытия zoom карточки по нажатию на картинку - вынесена в index.js
  /*  _handleCardClick() {
      this._element.querySelector('.card__image').addEventListener('click', (evt) => {
        zoomImage.src = evt.target.closest('.card__image').src;
        zoomImage.alt = evt.target.closest('.card__image').alt;
        zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
        openPopup(zoomPopup);
      });
    }*/

  _getTemplate() { //копируем содержимое из темплейта    
    const cardTemplate = document
      .querySelector(this._cardTemplateSelector)
      .content;

    const cardElement = cardTemplate
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  //публичные методы
  //функция обновления лайков локально доступна извне
  setLikes(likesArray) {
    this._cardLikeValue.textContent = likesArray.length; //обновить значение лайков с сервера
    this._cardLikes = likesArray; //обновить список лайков с сервера

    //При клике по сердечку анализируем его состояние на странице и добавляем или снимаем лайк
    if (!this._cardLike.classList.contains('card__like-active')) {
      this._cardLike.classList.add('card__like-active');
    }
    else {
      this._cardLike.classList.remove('card__like-active');
    }
  }

  createCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._linkValue;
    this._image.alt = `img = ${this._placeValue}`;
    this._text = this._element.querySelector('.card__text');
    this._text.textContent = this._placeValue;
    this._cardLikeValue = this._element.querySelector('.card__like-value');
    this._cardLike = this._element.querySelector('.card__like'); //разметка
    this._cardDelete = this._element.querySelector('.card__delete');

    //проверить наличие своих лайков на карточках с сервера
    this._checkPreviousLikes();
    
    //скрыть корзину на чужих карточках 
    if (this._cardOwner._id !== this._profileId) {
      this._cardDelete.classList.add('card__delete_hidden');
    }
    
    //обновить признаки лайков и их число
    this.setLikes(this._cardLikes);

    //установить слушатели событий для новой карточки через внешние методы
    this._setCardEventListener();
    this._setLikeEventListener();
    this._setDeleteEventListener();

    return this._element;
  }

  _setCardEventListener() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._placeValue, this._linkValue);
    })
  }
  _setLikeEventListener() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkPreviousLikes(), this);
    })
  }
  _setDeleteEventListener() {
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this);
    })
  }
}