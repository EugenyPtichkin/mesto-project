import { initialCards } from './constants.js';
import { cardsTable } from '../index.js';
import { openPopup } from './modal.js';

// Ссылка на zoom окна карточки и свойства картинки в zoom`е находятся однократно
const zoomPopup = document.querySelector('.popup_zoom');
const zoomImage = zoomPopup.querySelector('.popup__zoom-image');
const zoomTitle = zoomPopup.querySelector('.popup__zoom-title');

/* -------------------------------------------------------- */
/* -- Функция добавления карточки со всеми обработчиками -- */
/* -------------------------------------------------------- */
export function createCard(placeValue, linkValue) {
    //копируем содержимое из темплейта
    const cardTemplate = document.querySelector('#card-template').content;
  
    if (linkValue) { //добавить карточку если ссылка непустая
      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
      cardElement.querySelector('.card__image').src = linkValue;
      cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
      cardElement.querySelector('.card__text').textContent = placeValue;
  
      //При появлении новой карточки вешаем ей обработчик добавления лайков
      cardElement.querySelector('.card__like').addEventListener("click", function (evt) {
        evt.target.classList.toggle('card__like-active')
      });
  
      //При появлении новой карточки вешаем ей обработчик удаления карточки
      cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
      });
  
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
  
  /* ----------------------------------------------------------- */
  /* -- Функция добавления начальных карточек из initialCards -- */
  /* ----------------------------------------------------------- */
  export function initialAddCards() {
    for (let i = 0; i < initialCards.length; i++) {
      const placeValue = initialCards[i].name;
      const linkValue = initialCards[i].link;
  
      const newCardElement = createCard(placeValue, linkValue);
  
      //отображаем на странице перед всеми карточками
      cardsTable.prepend(newCardElement);
    }
  }