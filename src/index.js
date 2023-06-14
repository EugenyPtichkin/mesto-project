import './pages/index.css'; // импорт главного файла стилей
import { api } from './components/api.js';
import { Card } from './components/card.js';
/*import { enableValidation } from './components/validate.js';*/
import { cardsTable, profileName, profileText, profileAvatar } from './components/modal.js';
import { animationStartFunction, animationEndFunction } from './components/utils.js';

//id профиля пользователя храним глобально
export let profileId = '';

/* ------------------------------------------------------------ */
/* -- Ждем окончания загрузки и профиля и карточек с сервера -- */
/* ------------------------------------------------------------ */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {// отображаем результат на странице    
    console.log(userData);
    console.log(cards);
    // тут установка данных пользователя
    profileName.textContent = userData.name;
    profileText.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    profileId = userData._id;
    // и тут отрисовка карточек
    cards.reverse(); //более новые карточки вперед
    cards.forEach((cardObject) => {
      //добавляем карточки с сервера
      /*const newCardElement = createCard(cardObject.name, cardObject.link, cardObject._id, cardObject.likes, cardObject.owner);*/
      const newCardElement = new Card({
        placeValue: cardObject.name,
        linkValue: cardObject.link,
        cardId: cardObject._id,
        cardLikes: cardObject.likes,
        cardOwner:  cardObject.owner,
        apiLikeAdder: (item) => { api.addLike(item) },
        apiLikeDeleter: (item) => { api.deleteLike(item) },
        apiCardDeleter: (item) => { api.deleteCard(item) }
      }, '#card-template'
      );
      //отображаем на странице перед всеми карточками
      /*cardsTable.prepend(newCardElement);*/
      cardsTable.prepend(newCardElement.createCard());
    })
  })
  .catch(err => {
    console.log(err); // выводим ошибку в консоль
  })

/* -------------------------------------------------- */
/* -- Включение валидации вызовом enableValidation -- */
/* -------------------------------------------------- */
/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
});*/

/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
animationStartFunction();
animationEndFunction();