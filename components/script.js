/* ------------------------------------------ */
/* -- Обслуживание попапа редакции профиля -- */
/* ------------------------------------------ */
// Элементы из страницы со значениями полей текущего профиля
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

// Форма ввода профиля в DOM
const formElement = document.querySelector('.popup__form');
// Поля ввода формы профиля в DOM
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_occupation');

/* Открытие окна профиля */
const openProfileBtn = document.querySelector('.profile__button-edit');
/* Закрытие окна профиля*/
const closeBtn = document.querySelector('.popup__button-close');
/* Ссылка на окно редакции профиля */
const popupWin = document.querySelector('.popup');

//функции по открытию-наполнению и закрытию попапа редакции профиля
const openProfilePopup = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  popupWin.classList.add('popup_opened');
};
const closePopup = function () {
  popupWin.classList.remove('popup_opened');
};

//запуск функций редакции профиля по нажатию на кнопки
openProfileBtn.addEventListener('click', openProfilePopup);
closeBtn.addEventListener('click', closePopup);

/* Обработчик «отправки» формы для изменения профиля */
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
  closePopup();
}
// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

/* --------------------------------------------- */
/* -- Обслуживание попапа добавления карточки -- */
/* --------------------------------------------- */
// Форма ввода карточки в DOM
const formCardElement = document.querySelector('.popup-add__form');
// Поля ввода формы профиля в DOM 
const placeInput = formCardElement.querySelector('.popup-add__input_name');
const linkInput = formCardElement.querySelector('.popup-add__input_img-link');

/* Открытие окна новой карточки */
const openCardBtn = document.querySelector('.profile__button-add');
/* Закрытие окна добавления новой карточки*/
const closeAddBtn = document.querySelector('.popup-add__button-close');
/* Ссылка на окно редакции карточки */
const popupAddWin = document.querySelector('.popup-add');

//функции по открытию-наполнению и закрытию попапа добавления новой карточки
const openCardPopup = function () {
  //сброс ранее введенных значений, чтобы отобразить placeholder
  placeInput.value = '';
  linkInput.value = '';
  //перезапись параметров отображения окна ввода карточки
  placeInput.placeholder = 'Название';
  linkInput.placeholder = 'Ссылка на картинку';
  popupAddWin.classList.add('popup-add_opened');
};
const closeCardPopup = function () {
  popupAddWin.classList.remove('popup-add_opened');
};

//запуск функций добавления карточки по нажатию на кнопки
openCardBtn.addEventListener('click', openCardPopup);
closeAddBtn.addEventListener('click', closeCardPopup);

/* Обработчик «отправки» формы для добавления карточки */
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  //копируем содержимое из темплейта
  const cardTemplate = document.querySelector('#card-template').content;
  const cardsTable = document.querySelector('.cards');
  
  // наполняем содержимым
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  if(linkValue) { //добавить карточку если ссылка непустая
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
    cardElement.querySelector('.card__text').textContent = placeValue;

    /* отображаем на странице перед всеми карточками*/
    cardsTable.prepend(cardElement);

    //При появлении новой карточки вешаем ей обработчик добавления лайков
    cardElement.querySelector('.card__like').addEventListener("click", function (evt) {
      evt.target.classList.toggle('card__like-active')
    });

    //При появлении новой карточки вешаем ей обработчик удаления карточки
    cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
    });

    //При появлении новой карточки вешаем ей обработчик открытия zoom карточки и передаем информацию
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
      console.log('зашел в функцию');
      zoomImage.src = evt.target.closest('.card__image').src;
      zoomImage.alt = evt.target.closest('.card__image').alt;
      zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
      console.log('передал параметры' + zoomImage.src + zoomImage.alt + zoomTitle.textContent);
      openCardZoom();
    });
    
    //Обработчик закрытия zoom карточки уже есть
  }
  //Закрыть окно попапа
  closeCardPopup();
}
// Прикрепляем обработчик к форме:
formCardElement.addEventListener('submit', handleCardFormSubmit);

/* ------------------------------------------------------ */
/* -- Функция добавления начальных 6 карточек через js -- */
/* ------------------------------------------------------ */
function initialAddCards() {
  for (let i = 0; i < 6; i++) { //копируем содержимое темплейт 
    const cardTemplate = document.querySelector('#card-template').content; const cardsTable = document.querySelector('.cards');
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // наполняем содержимым
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__image').alt = `img=${initialCards[i].name}`;
    cardElement.querySelector('.card__text').textContent = initialCards[i].name; 
    /* отображаем на странице перед всеми карточками*/ 
    cardsTable.prepend(cardElement);
  }
}
initialAddCards();

/* -------------------------------------------------- */
/* -- Обслуживание Like для всех открытых карточек -- */
/* -------------------------------------------------- */
//перебором по всем карточкам устанавливаем слушатель клика с вызовом функции смены признака
const likeBtns = [...document.querySelectorAll('.card__like')]; 
  likeBtns.forEach(item => {
    item.addEventListener("click", function (evt) {
      evt.target.classList.toggle('card__like-active');
    });
});

/* ---------------------------------------------------------------- */
/* -- Обслуживание корзины - удаление для всех открытых карточек -- */
/* ---------------------------------------------------------------- */
const deleteBtns = [...document.querySelectorAll('.card__delete')];
//перебором по всем карточкам устанавливаем слушатель клика с вызовом функции удаления
deleteBtns.forEach(item => {
  item.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
});

/* ------------------------------------------------------------------ */
/* -- Открытие zoom окна карточки при нажатии на любую из картинок -- */
/* ------------------------------------------------------------------ */
const openCards = [...document.querySelectorAll('.card__image')];
const openCard = document.querySelector('.card__image');
/* Закрытие zoom окна карточки */
const closeCard = document.querySelector('.popup-zoom__button-close');
/* Ссылка на окно карточки */
const popupCard = document.querySelector('.popup-zoom');
/* Свойства картинки в zoom`е */
const zoomImage = document.querySelector('.popup-zoom__image');
const zoomTitle = document.querySelector('.popup-zoom__title');

const openCardZoom = function () {
  popupCard.classList.add('popup-zoom_opened');
};
const closeCardZoom = function () {
  popupCard.classList.remove('popup-zoom_opened');
};

//открытие-закрытие окна и передача данных по нажатию на кнопки
openCards.forEach(item => {//перебором по всем карточкам устанавливаем слушатель клика с вызовом окна zoom
  item.addEventListener('click', function (evt) {
    zoomImage.src = evt.target.closest('.card__image').src;
    zoomImage.alt = evt.target.closest('.card__image').alt;
    zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
    openCardZoom();
  });
});
closeCard.addEventListener('click', closeCardZoom);

/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
document.addEventListener('animationstart', function (e) {
  if (e.animationName === 'fade-in') {
    e.target.classList.add('did-fade-in');
  }
});
document.addEventListener('animationend', function (e) {
  if (e.animationName === 'fade-out') {
    e.target.classList.remove('did-fade-in');
  }
});