import './index.css'; // импорт главного файла стилей
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { handleSubmit, animationStartFunction, animationEndFunction } from '../utils/utils.js';
import {openProfileBtn, profileInputs, newAvatarBtn, openCardBtn, buttonDelete} from '../utils/constants.js';
import {validatorObject, addSelector, profileSelector, avatarSelector} from '../utils/constants.js';

//id профиля пользователя храним глобально
export let profileId = '';

//-----------------------------------------------------------------
// Экземпляры классов - модальные окна и инфо о пользователе
//-----------------------------------------------------------------
//экземпляр класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
  headers: {
    authorization: '72c9f5e3-e302-4291-9e92-5cdf6c091286',
    'Content-Type': 'application/json'
  }
});

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

//создать экземпляр класса кнопки подтверждения удаления карточки
const popupConfirm = new PopupWithSubmit('.popup_delete', handlePopupDelete);
popupConfirm.setEventListeners();//запустить cлушатель на крестик + отработка submit + запрет на сброс формы evt.preventDefault()

//создать экземпляр класса с данными о пользователе
const userInfo = new UserInfo('.profile__name', '.profile__text', '.profile__image');

//экземпляр класса Section для отрисовки всех карточек с сервера на странице объявляю когда появляется cards
const cardList = new Section({
//  items: cards, //появляются только при запросе к серверу, при объявлении отсутствуют
  renderer: (cardItem, id) => { //вызываем свой же метод (append), в него передаем разметку одной карточки
    cardList.addItem(createCard(cardItem, id));
  }
},
  '.cards' //в какую секцию вставлять
);

//-----------------------------------------------------------------
// Пустая функция ожидания подтверждения удаления
//-----------------------------------------------------------------
function handlePopupDelete() { };//никакого submit делать не надо, только ожидание нажатия на кнопку подтверждения

//-----------------------------------------------------------------
// Обслуживание редакции профиля
//-----------------------------------------------------------------
//запуск слушателя редакции профиля по нажатию на кнопку
openProfileBtn.addEventListener('click', () => {
  popupProfileForm.open();
  popupEditProfileValidator.resetValidation();
  //formValidators['.popup_profile'].resetValidation();
  const userPreviousData = userInfo.getUserInfo();
  profileInputs.forEach((input) => {
    input.value = userPreviousData[input.name];
  })
});

//внешняя функция формы для редакции профиля
function handlePopupProfile(formData, evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    return api.changeUserInfo(formData.user_name, formData.user_occupation)
      .then((userData) => {
        // userInfo.setUserInfo({
        //   name: userData.name,
        //   about: userData.about,
        //   avatar: userData.avatar,
        //   _id: userData._id
        // });
        userInfo.setUserInfo(userData);
        //Закрыть окно попапа после успешного ответа от сервера
        popupProfileForm.close();
      });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt, popupProfileForm);
}

//-----------------------------------------------------------------
// Обслуживание редакции аватара профиля
//-----------------------------------------------------------------
//запуск слушателя добавления карточки по нажатию на кнопки
newAvatarBtn.addEventListener('click', () => {
  popupAvatarForm.open();
  popupChangeAvatarValidator.resetValidation(); 
  //formValidators['.popup_avatar-update'].resetValidation();
});

//внешняя функция формы для редакции аватара
function handlePopupAvatar(formData, evt) {
  function makeRequest() {
    return api.changeAvatar(formData['img-link'])
      .then((avatarData) => {
        userInfo.setAvatarInfo({
          avatar: avatarData.avatar
        });
        //Закрыть окно попапа после успешного ответа от сервера
        popupAvatarForm.close();
      });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt, popupAvatarForm);
}

//-----------------------------------------------------------------
// Обслуживание добавления новой карточки
//-----------------------------------------------------------------
//запуск слушателя добавления карточки по нажатию на кнопку
openCardBtn.addEventListener('click', () => {
  popupAddCardForm.open();
  popupAddCardValidator.resetValidation();
  //formValidators['.popup_add'].resetValidation();
});

//внешяя функция формы для отсылки карточки
function handlePopupAddCard(formData, evt) {
  function makeRequest() {
    return api.addNewCard(formData['place-name'], formData['img-link'])
      .then((cardData) => {
        //если удалось отослать на сервер, создаем карточку локально и отображаем      
        const newAddedCard = createCard(cardData, profileId);

        cardList.addItem(newAddedCard);   //cardSingle
        //Закрыть окно попапа после успешного ответа от сервера
        popupAddCardForm.close();
      });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt, popupAddCardForm);
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

//функция открытия карточки 
function handleCardClick(cardName, cardLink) {
  popupWithImage.open(cardName, cardLink);
}

// Обслуживание модального окна подтверждения удаления карточки
// Промисификация кнопки удаления карточки
function handleDeleteAccept() {
  return new Promise((resolve) => {
    buttonDelete.onclick = function () { //отдать промис в состоянии разрешен только после нажатия на кнопку
      resolve();
    }
  })
}

//функция удаления карточки
function handleDeleteClick(id, card) {

  popupConfirm.open();//открыть попап подтверждения удаления

  handleDeleteAccept() //ожидаем промис после подтверждения нажатия клавиши
    .then(() => {
      //послать запрос на удаление с сервера  
      api.deleteCard(id)
        .then((result) => {
          console.log(result);
          //закрыть модальное окно после успешного ответа от сервера
          popupConfirm.close();
          //удалить из DOM карточку локально после успешного ответа от сервера                          
          card.removeCard(); //через новый метод класса Card
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        });
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// ------------------------------------------------------------
// Функция создания разметки карточки через объект Card
// ------------------------------------------------------------
function createCard(dataCard, id) {
  const card = new Card({
    data: dataCard,
    handleCardClick, //принимает (this._placeValue, this._linkValue) 
    handleLikeClick, //принимает (this._cardId, this._checkPreviousLikes(), this)
    handleDeleteClick//принимает (this._cardId, this)
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
  .then(([userData, cards]) => {// прием данных с деструктиризацией 
    console.log(userData);  //отображаем данные пользователя в логе
    console.log(cards);     //отображаем текущие карточки в логе
    // тут установка данных пользователя через класс
    // userInfo.setUserInfo({
    //   name: userData.name,
    //   about: userData.about,
    //   avatar: userData.avatar,
    //   _id: userData._id
    // });
    userInfo.setUserInfo(userData); //деструктуризация ответа от сервера
    profileId = userData._id;

    // тут отрисовка карточек
    cards.reverse(); //более новые карточки вперед    
    //отрисовка карточек с сервера через метод класса CardList от имени текущего пользователя
    cardList.renderItems(cards, profileId);

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
const popupAddCardValidator = new FormValidator(validatorObject, addSelector);
const popupEditProfileValidator = new FormValidator(validatorObject, profileSelector);
const popupChangeAvatarValidator = new FormValidator(validatorObject, avatarSelector);

//Включение валидации для вновь открытого модального окна с формами ввода
popupAddCardValidator.enableValidation();
popupEditProfileValidator.enableValidation();
popupChangeAvatarValidator.enableValidation();

/*
//-----------------------------------------------------------------
// Все валидаторы через один объект
//-----------------------------------------------------------------
const formValidators = {};

// Включение валидации
const enableValidation = (validatorObject) => {
  const formList = Array.from(document.querySelectorAll(validatorObject.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validatorObject);

//formValidators[ profileForm.getAttribute('name') ].resetValidation();
// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
//formValidators['profile-form'].resetValidation();
*/