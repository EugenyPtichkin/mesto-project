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
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", closePopupModalListener);   /* убрать слушатель на модальное окно */
  document.removeEventListener('keydown', closePopupEscListener);/* убрать слушатель на esc */
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

/* Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия*/
function closePopupModal(popupElement) {
  popupElement.addEventListener("click", closePopupModalListener);
}
function closePopupModalListener(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}
/* Закрытие модального окна при нажатии на Esc: если значение нажатой кнопки Esc
то находим переменную с селектором открытого попапа и закрываем его*/
function closePopupEsc() {
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
const cardPopup = document.querySelector('.popup_add');
// Форма ввода карточки в DOM
const formCardElement = cardPopup.querySelector('.popup__form');
// Поля ввода формы профиля в DOM 
const placeInput = formCardElement.querySelector('.popup__input_place');
const linkInput = formCardElement.querySelector('.popup__input_link');

// Открытие окна новой карточки
const openCardBtn = document.querySelector('.profile__button-add');
//запуск функций добавления карточки по нажатию на кнопки
openCardBtn.addEventListener('click', () => {
  formCardElement.reset(); //сброс ранее введенных значений
  openPopup(cardPopup);
  closePopupModal(cardPopup); 
  closePopupEsc(cardPopup);
});

//определяем место вставки новой карточки глобально вне функции
const cardsTable = document.querySelector('.cards');

// Обработчик «отправки» формы для добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newCardElement = createCard(placeValue, linkValue);

  //отображаем на странице перед всеми карточками, если элемент непустой
  if (newCardElement) {
    cardsTable.prepend(newCardElement);
  }

  //Закрыть окно попапа
  closePopup(cardPopup);
}
// Прикрепляем обработчик к форме:
formCardElement.addEventListener('submit', handleCardFormSubmit);

/* -------------------------------------------------------- */
/* -- Функция добавления карточки со всеми обработчиками -- */
/* -------------------------------------------------------- */
function createCard(placeValue, linkValue) {
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

    // Ссылка на zoom окна карточки 
    const zoomPopup = document.querySelector('.popup_zoom');
    // Свойства картинки в zoom`е 
    const zoomImage = zoomPopup.querySelector('.popup__zoom-image');
    const zoomTitle = zoomPopup.querySelector('.popup__zoom-title');

    //При появлении новой карточки вешаем ей обработчик открытия zoom карточки по нажатию на картинку 
    //передаем информацию для отображения
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
      zoomImage.src = evt.target.closest('.card__image').src;
      zoomImage.alt = evt.target.closest('.card__image').alt;
      zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
      openPopup(zoomPopup);
      closePopupModal(zoomPopup); 
      closePopupEsc(zoomPopup);
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
function initialAddCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const placeValue = initialCards[i].name;
    const linkValue = initialCards[i].link;

    const newCardElement = createCard(placeValue, linkValue);

    //отображаем на странице перед всеми карточками
    cardsTable.prepend(newCardElement);
  }
}
initialAddCards(); //запускаем функцию однократно

/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
document.addEventListener('animationstart', function (evt) {
  if (evt.animationName === 'fade-in') {
    evt.target.classList.add('did-fade-in');
  }
});
document.addEventListener('animationend', function (evt) {
  if (evt.animationName === 'fade-out') {
    evt.target.classList.remove('did-fade-in');
  }
});


/* ------------------------------- */
/* -- Валидация нескольких форм -- */
/* ------------------------------- */
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);   /*подчеркнуть красным*/
  errorElement.classList.add(errorClass); /*открыть подсказку*/
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass); /*убрать подчеркивание*/
  errorElement.classList.remove(errorClass);/*скрыть подсказку*/
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {/*проверка алфавита*/
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");       /*стандартные сообщения*/
  }
  if (!inputElement.validity.valid) {         /*есть ошибка ввода, показать*/
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);  
  } else {                                    /*нет ошибок ввода, скрыть*/
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => { /*хотя бы одно поле списка не имеет флаг valid=true*/
  return inputList.some((listItem) => {
    return !listItem.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {   /* притушить кнопку submit */
    buttonElement.classList.add(inactiveButtonClass);
  } else {                            /* разрешить кнопку submit */
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => { 
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));  /*отслеживать ввод на всех полях форм*/
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) { /* по каждому нажатию на клавишу */
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);  /* менять состояние кнопки submit */
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);/* проверять валидность ввода */
    });
  });
};

function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {    
  const formList = Array.from(document.querySelectorAll(formSelector));/* перебрать обе формы на странице */
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
});