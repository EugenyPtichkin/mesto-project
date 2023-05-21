import { changeUserInfo, addNewCard, changeAvatar } from './api.js';
import { createCard } from './card.js';
import { renderLoading } from './utils.js';

//определяем место вставки новой карточки глобально вне функции
export const cardsTable = document.querySelector('.cards');

/* -------------------------------------------------------------------- */
/* -- Обслуживание закрытия любого модального окна по кнопке крестик -- */
/* -------------------------------------------------------------------- */
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

/* -------------------------------------------------------- */
/* -- Отдельные функции закрытия-открытия модальных окон -- */
/* -------------------------------------------------------- */
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("click", closePopupModalListener); /* Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия*/
  document.addEventListener('keydown', closePopupEscListener); /* Закрытие модального окна при нажатии на Esc */
};
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", closePopupModalListener);   /* убрать слушатель на модальное окно */
  document.removeEventListener('keydown', closePopupEscListener);/* убрать слушатель на esc */
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

/* --------------------------------------------------- */
/* -- Обслуживание модального окна редакции профиля -- */
/* --------------------------------------------------- */
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

// Обработчик «отправки» формы для изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Обновить профиль на сервере
  changeUserInfo(nameValue, jobValue)
    .then((result) => {
      // отображаем результат на странице если обновление на сервере успешно
      profileName.textContent = result.name;
      profileText.textContent = result.about;
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally((res) => {
      renderLoading(false);
    });

  closePopup(profilePopup);
}
// Прикрепляем обработчик к форме:
formProfileElement.addEventListener('submit', handleFormSubmit);


/* ------------------------------------------------------ */
/* -- Обслуживание модального окна добавления карточки -- */
/* ------------------------------------------------------ */
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
  addButton.disabled = true;    /* установить свойство неактивно, чтобы заблокировать Enter */
  openPopup(cardPopup);
});

/* --------------------------------------------------------- */
/* -- Обработчик «отправки» формы для добавления карточки -- */
/* --------------------------------------------------------- */
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  //Отправить данные о новой карточке на сервер
  addNewCard(placeValue, linkValue)
    .then((result) => {
      // отображаем результат в логе
      /*console.log(result);*/
      //если удалось отослать на сервер, создаем карточку локально и отображаем
      const newCardElement = createCard(result.name, result.link, result._id, result.likes, result.owner);
      //добавление новых карточек после всех, поскольку новые карточки с сайта добавляются внизу и при чтении вернутся в другом порядке
      cardsTable.append(newCardElement);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally((res) => {
      renderLoading(false);
    });

  //Закрыть окно попапа
  closePopup(cardPopup);
}
// Прикрепляем обработчик к форме:
formCardElement.addEventListener('submit', handleCardFormSubmit);

/* ------------------------------------------------------------------ */
/* -- Обслуживание модального окна подтверждения удаления карточки -- */
/* ------------------------------------------------------------------ */
// Ссылка на окно удаления карточки
export const popupDelete = document.querySelector('.popup_delete');
// Кнопка подтверждения
export const buttonDelete = popupDelete.querySelector('.popup__button-submit');

// Промисификация кнопки удаления карточки
export function handleDeleteAccept(button) {
  return new Promise((resolve) => {
    function listener(e) {
      resolve(e);
      button.removeEventListener('click', listener);
    }
    button.addEventListener("click", listener);
  });
}

/* --------------------------------------------------------- */
/* -- Обслуживание модального окна редактирования аватара -- */
/* --------------------------------------------------------- */
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
  changeAvatarButton.disabled = true;    /* установить свойство неактивно, чтобы заблокировать Enter */
  openPopup(avatarPopup);
});

/* ------------------------------------------------------- */
/* -- Обработчик «отправки» формы для изменения аватара -- */
/* ------------------------------------------------------- */
function handleChangeAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);

  const avatarLinkValue = avatarLinkInput.value;
  /*console.log(avatarLinkValue);*/

  //Отправить данные о новой карточке на сервер
  changeAvatar(avatarLinkValue)
    .then((result) => {
      // отображаем результат в логе
      /*console.log(result);*/
      //если удалось отослать на сервер меняем аватар локально
      profileAvatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally((res) => {
      renderLoading(false);
    });

  //Закрыть окно попапа
  closePopup(avatarPopup);
}
// Прикрепляем обработчик к форме:
formAvatarElement.addEventListener('submit', handleChangeAvatarSubmit);