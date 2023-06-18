
//import { changeUserInfo, addNewCard, changeAvatar } from './api.js';
import { api } from './Api.js';
import Card  from './Card.js';
import { handleSubmit } from './utils.js';
import FormValidator from './FormValidator.js';


//определяем место вставки новой карточки глобально вне функции
export const cardsTable = document.querySelector('.cards');

// --------------------------------------------------------------------
// -- Обслуживание закрытия любого модального окна по кнопке крестик --/
// --------------------------------------------------------------------
// Все кнопки-крестики для закрытия окон через NodeList
const closeBtns = document.querySelectorAll('.popup__button-close');
// Перебор по всем кнопкам из NodeList
closeBtns.forEach((button) => {
  //находим ближайший к кнопке попап
  const popupNear = button.closest('.popup');
  //устанавливаем обработчик закрытия на кнопку-крестик
  button.addEventListener('click', () =>
    closePopup(popupNear));
});

// -------------------------------------------------------- 
// -- Отдельные функции закрытия-открытия модальных окон -- 
// -------------------------------------------------------- 
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("click", closePopupModalListener); // Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия
  document.addEventListener('keydown', closePopupEscListener); // Закрытие модального окна при нажатии на Esc 

  if (popup.querySelector('.popup__form')) { //если в новом окне есть форма, тогда
    //объявление нового элемента класса FormValidator для открывающегося окна popup
    const popupValidator = new FormValidator({
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button-submit',
      inactiveButtonClass: 'popup__button-submit_inactive',
      inputErrorClass: 'popup__input_type-error',
      errorClass: 'popup__input-error_active'
    },
      popup.querySelector('.popup__form') //ссылка на форму открывающегося окна
    );
    //Включение валидации для каждого вновь открытого модального окна
    popupValidator.enableValidation();
  };
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", closePopupModalListener);   // убрать слушатель на модальное окно
  document.removeEventListener('keydown', closePopupEscListener);// убрать слушатель на esc
}
function closePopupModalListener(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}
function closePopupEscListener(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// ---------------------------------------------------
// -- Обслуживание модального окна редакции профиля --
// ---------------------------------------------------
// Элементы из страницы со значениями полей текущего профиля
export const profileName = document.querySelector('.profile__name');
export const profileText = document.querySelector('.profile__text');
export const profileAvatar = document.querySelector('.profile__image');
// Ссылка на окно редакции профиля
const profilePopup = document.querySelector('.popup_profile');
// Форма ввода профиля в DOM
const formProfileElement = profilePopup.querySelector('.popup__form');
// Поля ввода формы профиля в DOM
const nameInput = formProfileElement.querySelector('.popup__input_name');
const jobInput = formProfileElement.querySelector('.popup__input_occupation');

// Открытие окна профиля
const openProfileBtn = document.querySelector('.profile__button-edit');
// Запуск функции редакции профиля по нажатию на кнопку
openProfileBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  openPopup(profilePopup);
});

// -------------------------------------------------------
// -- Обработчик «отправки» формы для изменения профиля --
// -------------------------------------------------------
// оптимизация обработчика сабмита формы профиля
function handleProfileFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.changeUserInfo(nameInput.value, jobInput.value).then((userData) => {
      profileName.textContent = userData.name;
      profileText.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      //Закрыть окно попапа после успешного ответа от сервера
      closePopup(profilePopup);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}
// Прикрепляем обработчик к форме:
formProfileElement.addEventListener('submit', handleProfileFormSubmit);


// ------------------------------------------------------
// -- Обслуживание модального окна добавления карточки --
// ------------------------------------------------------
// Ссылка на окно редакции карточки
export const cardPopup = document.querySelector('.popup_add');
// Форма ввода карточки в DOM
export const formCardElement = cardPopup.querySelector('.popup__form');
// Поля ввода формы профиля в DOM 
export const placeInput = formCardElement.querySelector('.popup__input_place');
export const linkInput = formCardElement.querySelector('.popup__input_link');
const addButton = formCardElement.querySelector('.popup__button-submit');

// Открытие окна новой карточки
const openCardBtn = document.querySelector('.profile__button-add');
//запуск функций добавления карточки по нажатию на кнопки
openCardBtn.addEventListener('click', () => {
  formCardElement.reset(); //сброс ранее введенных значений  
  addButton.classList.add('popup__button-submit_inactive');//установка неактивного состояния кнопки отправки при открытии окна
  addButton.disabled = true;    // установить свойство неактивно, чтобы заблокировать Enter
  openPopup(cardPopup);
});

// --------------------------------------------------------- 
// -- Обработчик «отправки» формы для добавления карточки -- 
// --------------------------------------------------------- 
// оптимизация обработчика сабмита новой карточки
function handleCardFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.addNewCard(placeInput.value, linkInput.value).then((cardData) => {
      //если удалось отослать на сервер, создаем карточку локально и отображаем      
      //const newCardElement = createCard(cardData.name, cardData.link, cardData._id, cardData.likes, cardData.owner);
      const newCardElement = new Card({
        data: cardData,
//      placeValue: cardData.name,
//      linkValue: cardData.link,
//      cardId: cardData._id,
//      cardLikes: cardData.likes,
//      cardOwner:  cardData.owner,
        apiLikeAdder: (item) => { api.addLike(item) },
        apiLikeDeleter: (item) => { api.deleteLike(item) },
        apiCardDeleter: (item) => { api.deleteCard(item) }
      }, '#card-template',
      profileId
      );
      //добавление новых карточек сверху
      //cardsTable.prepend(newCardElement);
      cardsTable.prepend(newCardElement.createCard());
      //Закрыть окно попапа после успешного ответа от сервера
      closePopup(cardPopup);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}
// Прикрепляем обработчик к форме:
formCardElement.addEventListener('submit', handleCardFormSubmit);

// ------------------------------------------------------------------
// -- Обслуживание модального окна подтверждения удаления карточки --
// ------------------------------------------------------------------
// Ссылка на окно удаления карточки
export const popupDelete = document.querySelector('.popup_delete');
// Кнопка подтверждения
const buttonDelete = popupDelete.querySelector('.popup__button-submit');

// Промисификация кнопки удаления карточки
export function handleDeleteAccept() {
  return new Promise((resolve) => {
    buttonDelete.onclick = function () { //отдать промис в состоянии разрешен только после нажатия на кнопку
      resolve();
    }
  })
}

// ---------------------------------------------------------
// -- Обслуживание модального окна редактирования аватара --
// ---------------------------------------------------------
// Ссылка на окно редакции карточки
export const avatarPopup = document.querySelector('.popup_avatar-update');
// Форма ввода карточки в DOM
export const formAvatarElement = avatarPopup.querySelector('.popup__form');
// Поля ввода формы профиля в DOM 
export const avatarLinkInput = formAvatarElement.querySelector('.popup__input_link');
const changeAvatarButton = formAvatarElement.querySelector('.popup__button-submit');

// Открытие окна новой карточки
const newAvatarBtn = document.querySelector('.profile__button-avatar');
//запуск функций добавления карточки по нажатию на кнопки
newAvatarBtn.addEventListener('click', () => {
  formAvatarElement.reset(); //сброс ранее введенных значений  
  changeAvatarButton.classList.add('popup__button-submit_inactive');//установка неактивного состояния кнопки отправки при открытии окна
  changeAvatarButton.disabled = true;    // установить свойство неактивно, чтобы заблокировать Enter
  openPopup(avatarPopup);
});

// -------------------------------------------------------
// -- Обработчик «отправки» формы для изменения аватара --
// -------------------------------------------------------
// оптимизация обработчика сабмита изменения аватара
function handleChangeAvatarSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return api.changeAvatar(avatarLinkInput.value).then((avatarData) => {
      //если удалось отослать на сервер меняем аватар локально
      profileAvatar.src = avatarData.avatar;
      //Закрыть окно попапа после успешного ответа от сервера
      closePopup(avatarPopup);
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// Прикрепляем обработчик к форме:
formAvatarElement.addEventListener('submit', handleChangeAvatarSubmit);