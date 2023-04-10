/* 6 карточек из коробки */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }  
];

// Элементы со значениями полей
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
// Форма ввода в DOM
const formElement = document.querySelector('.popup__form');
// Поля ввода формы в DOM
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_occupation');
// Заглавие и название кнопки формы в DOM
const popupTitle = formElement.querySelector('.popup__title');
const submitBtn = formElement.querySelector('.popup__button-submit');

/* Открытие окна профиля */
const openProfileBtn = document.querySelector('.profile__button-edit');
/* Открытие окна новой карточки */
const openCardBtn = document.querySelector('.profile__button-add');
/* Закрытие окна */
const closeBtn = document.querySelector('.popup__button-close');
/* Ссылка на само окно */
const popupWin = document.querySelector('.popup');

//флаг-признак открытия попапа для добавления карточки
var cardAdd = false;

//функции по открытию-наполнению и закрытию попапа
const openProfilePopup = function () {
  cardAdd = false;//признак редакции профиля
  //перезапись параметров окна редактирования профиля
  popupTitle.textContent = 'Редактировать профиль';
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
  submitBtn.textContent = 'Сохранить';
  popupWin.classList.add('popup_opened');
};
const openCardPopup = function () {
  cardAdd = true;//признак добавления карточки
  //сброс ранее введенных значений, чтобы отобразить placeholder
  nameInput.value = '';
  jobInput.value = '';
  //перезапись параметров отображения окна ввода карточки
  popupTitle.textContent = 'Новое место';
  nameInput.placeholder = 'Название';
  jobInput.placeholder = 'Ссылка на картинку';
  submitBtn.textContent = 'Создать';
  popupWin.classList.add('popup_opened');
};
const closePopup = function () {
  cardAdd = false;
  popupWin.classList.remove('popup_opened');
};

//запуск функций по нажатию на кнопки
openProfileBtn.addEventListener('click', openProfilePopup);
openCardBtn.addEventListener('click', openCardPopup);
closeBtn.addEventListener('click', closePopup);


/* Обработчик «отправки» формы для изменения профиля или добавления карточки */
function handleFormSubmit(evt) {
  evt.preventDefault();

  //Обработчик изменения профиля
  if (!cardAdd) { //если открыто не добавлением карточки, то редактируем профиль 
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    if (nameValue) {
      profileName.textContent = nameValue;
    }
    if (jobValue) {
      profileText.textContent = jobValue;
    }
  }

  // Обработчик добавления карточки
  if (cardAdd) {//добавляем карточку через темлпейт
    //копируем содержимое темплейт
    const cardTemplate = document.querySelector('#card-template').content;
    const cardsTable = document.querySelector('.cards');
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // наполняем содержимым
    const placeValue = nameInput.value;
    const urlValue = jobInput.value;
    cardElement.querySelector('.card__image').src = urlValue;
    cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
    cardElement.querySelector('.card__text').textContent = placeValue;

    /* отображаем на странице перед всеми карточками*/
    cardsTable.prepend(cardElement);
  }

  //Закрыть окно попапа
  closePopup();

}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//функция добавления начальных 6 карточек через js
function initialAddCards() {
  for(let i=0; i<6; i++) {
    //копируем содержимое темплейт
    const cardTemplate = document.querySelector('#card-template').content;
    const cardsTable = document.querySelector('.cards');
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = initialCards[i].link;
    cardElement.querySelector('.card__image').alt = `img = ${initialCards[i].name}`;
    cardElement.querySelector('.card__text').textContent = initialCards[i].name;

    /* отображаем на странице перед всеми карточками*/
    cardsTable.prepend(cardElement);
  }
}

initialAddCards();

/* Like для всех карточек */
//выбираем все карточки
const likeBtns = [...document.querySelectorAll('.card__like')];
//перебором по всем карточкам устанавливаем слушатель клика с вызовом функции смены признака
likeBtns.forEach(item => {
  item.addEventListener("click", function(evt) {
    evt.target.classList.toggle('card__like-active');
  });
});
