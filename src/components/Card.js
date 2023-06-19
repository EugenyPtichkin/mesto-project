export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, cardTemplateSelector, profileId) {    
    this._placeValue = data.name;
    this._linkValue = data.link;
    this._cardId = data._id;
    this._cardLikes = data.likes;
    this._cardOwner = data.owner;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardTemplateSelector = cardTemplateSelector;
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
    else {
      this._cardLike.classList.remove('card__like-active');
    }
    return myLikeFound;
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

  generate() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._linkValue;
    this._image.alt = `img = ${this._placeValue}`;
    this._text = this._element.querySelector('.card__text');
    this._text.textContent = this._placeValue;
    this._cardLikeValue = this._element.querySelector('.card__like-value');
    this._cardLike = this._element.querySelector('.card__like'); //разметка
    this._cardDelete = this._element.querySelector('.card__delete');

    
    //скрыть корзину на чужих карточках 
    if (this._cardOwner._id !== this._profileId) { 
      this._cardDelete.classList.add('card__delete_hidden');
    }

    //обновить признаки лайков и их число, а также инвертировать состояние лайка на странице
    this.setLikes(this._cardLikes);

    //проверить наличие своих лайков на карточках с сервера и установить лайки в соответствии с данным сервера
    this._checkPreviousLikes();
        
    //установить слушатели событий для новой карточки через внешние методы
    this._setEventListeners();

    return this._element;
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._placeValue, this._linkValue); 
    })
      
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkPreviousLikes(), this);
    })

    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick(this._cardId, this);
    })
  }
}