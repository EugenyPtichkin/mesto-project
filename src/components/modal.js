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
export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", closePopupModalListener);   /* убрать слушатель на модальное окно */
  document.removeEventListener('keydown', closePopupEscListener);/* убрать слушатель на esc */
}
export function openPopup(popup) {
  popup.classList.add('popup_opened');
};

/* Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия*/
export function closePopupModal(popupElement) {
  popupElement.addEventListener("click", closePopupModalListener);
}
function closePopupModalListener(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}
/* Закрытие модального окна при нажатии на Esc: если значение нажатой кнопки Esc
то находим переменную с селектором открытого попапа и закрываем его*/
export function closePopupEsc() {
  document.addEventListener('keydown', closePopupEscListener);
}
function closePopupEscListener(evt) {
  if (evt.key === 'Escape') {
    const popupElement = document.querySelector('.popup_opened');
    closePopup(popupElement);
  }
}

/* --------------------------------------------------- */
/* -- Обслуживание модального окна редакции профиля -- */
/* --------------------------------------------------- */
// Элементы из страницы со значениями полей текущего профиля
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
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
  closePopupModal(profilePopup); 
  closePopupEsc(profilePopup);
});

// Обработчик «отправки» формы для изменения профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  if (nameValue) { //обновить данные, если поле непустое
    profileName.textContent = nameValue;
  }
  if (jobValue) {
    profileText.textContent = jobValue;
  }
  closePopup(profilePopup)
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

// Открытие окна новой карточки
const openCardBtn = document.querySelector('.profile__button-add');
//запуск функций добавления карточки по нажатию на кнопки
openCardBtn.addEventListener('click', () => {
  formCardElement.reset(); //сброс ранее введенных значений
  openPopup(cardPopup);
  closePopupModal(cardPopup); 
  closePopupEsc(cardPopup);
});