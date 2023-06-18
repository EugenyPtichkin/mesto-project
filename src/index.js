import './pages/index.css'; // импорт главного файла стилей
import { api } from './components/Api.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import { animationStartFunction, animationEndFunction } from './components/utils.js';

//id профиля пользователя храним глобально
export let profileId = '';

//-----------------------------------------------------------------
// Экземпляры классов - модальные окна и инфо о пользователе
//-----------------------------------------------------------------
//создать экземпляр класса zoom карточки, обращаться к классу нельзя, только к экземпляру!
const popupWithImage = new PopupWithImage('.popup_zoom');
popupWithImage.setEventListeners();//запустить cлушатель на крестик

//создать экземпляр класса формы новой карточки
const popupAddCardForm = new PopupWithForm('.popup_add', handlePopupAddCard);
popupAddCardForm.setEventListeners();//запустить cлушатель на крестик + отработка submit + запрет на сброс формы evt.preventDefault()

//создать экземпляр класса формы профиля
const popupProfileForm = new PopupWithForm('.popup_profile', handlePopupProfile);
popupProfileForm.setEventListeners();//запустить cлушатель на крестик + отработка submit + запрет на сброс формы evt.preventDefault()

//создать экземпляр класса формы аватара
const popupAvatarForm = new PopupWithForm('.popup_avatar-update', handlePopupAvatar);
popupAvatarForm.setEventListeners();//запустить cлушатель на крестик + отработка submit + запрет на сброс формы evt.preventDefault()


//создать экземпляр класса с данными о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__image');


//-----------------------------------------------------------------
// Обслуживание редакции профиля
//-----------------------------------------------------------------
// кнопка открытия окна профиля
const openProfileBtn = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.popup_profile');
const profileInputs = profilePopup.querySelectorAll('.popup__input');
// Запуск функции редакции профиля по нажатию на кнопку
openProfileBtn.addEventListener('click', () => {
  popupProfileForm.open();
  const userPreviousData = userInfo.getUserInfo();
  profileInputs.forEach((input) => {
    input.value = userPreviousData[input.name];
  })
});

//внешняя функция формы для редакции профиля
function handlePopupProfile(formData) {
  api.changeUserInfo(formData.user_name, formData.user_occupation)
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        info: userData.about,
        avatar: userData.avatar
      });
      //Закрыть окно попапа после успешного ответа от сервера
      popupProfileForm.close();
    });
}

//-----------------------------------------------------------------
// Обслуживание редакции аватара профиля
//-----------------------------------------------------------------
// Ссылка на окно редакции карточки
//const avatarPopup = document.querySelector('.popup_avatar-update');
// Форма ввода карточки в DOM
//const formAvatarElement = avatarPopup.querySelector('.popup__form');
// Поля ввода формы профиля в DOM 
//export const avatarLinkInput = formAvatarElement.querySelector('.popup__input_link');
//const changeAvatarButton = formAvatarElement.querySelector('.popup__button-submit');

// Запуск функции редакции профиля по нажатию на аватар
const newAvatarBtn = document.querySelector('.profile__button-avatar');
//запуск функций добавления карточки по нажатию на кнопки
newAvatarBtn.addEventListener('click', () => {
//  changeAvatarButton.disabled = true;    // установить свойство неактивно, чтобы заблокировать Enter
  popupAvatarForm.open();
});

//внешняя функция формы для редакции аватара
function handlePopupAvatar(formData) {
  api.changeAvatar(formData['img-link'])
    .then((avatarData) => {
      userInfo.setAvatarInfo({
        avatar: avatarData.avatar
      });
      //Закрыть окно попапа после успешного ответа от сервера
      popupAvatarForm.close();
    });
}

//-----------------------------------------------------------------
// Обслуживание добавления новой карточки
//-----------------------------------------------------------------
//кнопка открытия окна новой карточки
const openCardBtn = document.querySelector('.profile__button-add');
//запуск слушателя добавления карточки по нажатию на кнопку
openCardBtn.addEventListener('click', () => {
  popupAddCardForm.open();
});

//внешяя функция формы для отсылки карточки
function handlePopupAddCard(formData) {
  api.addNewCard(formData['place-name'], formData['img-link'])
    .then((cardData) => {
      //если удалось отослать на сервер, создаем карточку локально и отображаем      
      const newAddedCard = createCard(cardData, profileId);

      //экземпляр класса Section для отрисовки одной карточки
      const cardSingle = new Section({
        items: {},
        renderer: (cardItem, id) => { } //неважно какой назначить метод, не будет использован
      },
        '.cards' //в какую секцию вставлять
      );

      cardSingle.addItem(newAddedCard);
      //Закрыть окно попапа после успешного ответа от сервера
      popupAddCardForm.close(); //closePopup(cardPopup);
    });
}

//----------------------------------------------------------
// Внешние методы функиции createCard
//----------------------------------------------------------
//функция обновления лайков на сервере а затем локально
function handleLikeClick(id, previousLikes, card) {
  if (!previousLikes) {
    api.addLike(id)
      .then((result) => {
        //обновляем элемент на странице
        card.setLikes(result.likes)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    api.deleteLike(id)
      .then((result) => {
        //обновляем элемент на странице
        card.setLikes(result.likes)
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}

//функция открытия карточки при клике на нее
function handleCardClick(cardName, cardLink) {
  popupWithImage.open(cardName, cardLink);
}

function handleDeleteClick() { }

//функция создания разметки карточки через объект Card
function createCard(dataCard, id) {
  const card = new Card({
    data: dataCard,
    handleCardClick, //принимает (this._placeValue, this._linkValue) 
    handleLikeClick, //принимает (this._cardId, this._checkPreviousLikes(), this)
    handleDeleteClick//принимает (this._cardId, this) //пока не реализована
  },
    '#card-template',
    id);

  const newCard = card.generate();
  return newCard;
}



// ------------------------------------------------------------
// -- Ждем окончания загрузки и профиля и карточек с сервера --
// ------------------------------------------------------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {// прием данных с деструтиризацией 
    console.log(userData);  //отображаем данные пользователя в логе
    console.log(cards);     //отображаем текущие карточки в логе
    // тут установка данных пользователя через класс
    userInfo.setUserInfo({
      name: userData.name,
      info: userData.about,
      avatar: userData.avatar
    });
    profileId = userData._id;

    // тут отрисовка карточек
    cards.reverse(); //более новые карточки вперед    

    //экземпляр класса Section для отрисовки всех карточек с сервера на странице объявляю когда появляется cards
    const cardList = new Section({
      items: cards,
      renderer: (cardItem, id) => { //вызываем свой же метод (append), в него передаем разметку одной карточки
        cardList.addItem(createCard(cardItem, id));
      }
    },
      '.cards' //в какую секцию вставлять
    );

    //отрисовка карточек с сервера через метод класса CardList от имени текущего пользователя
    cardList.renderItems(profileId);

  })
  .catch(err => {
    console.log(err); // выводим ошибку в консоль
  })

// ---------------------------------------------
// -- Обслуживание анимации плавного закрытия --
// ---------------------------------------------
animationStartFunction();
animationEndFunction();

//-----------------------------------------------------------------
// Запустить валидацию через класс для модальных окон с формами ввода
//-----------------------------------------------------------------
const popupAddCardValidator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
},
  document.querySelector('.popup_add') //ссылка на форму открывающегося окна
);

const popupEditProfileValidator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
},
  document.querySelector('.popup_profile') //ссылка на форму открывающегося окна
);

const popupChangeAvatarValidator = new FormValidator({
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
},
  document.querySelector('.popup_avatar-update') //ссылка на форму открывающегося окна
);

//Включение валидации для вновь открытого модального окна с формами ввода
popupAddCardValidator.enableValidation();
popupEditProfileValidator.enableValidation();
popupChangeAvatarValidator.enableValidation();



