import './pages/index.css'; // импорт главного файла стилей
import { api } from './components/Api.js';
import { Card } from './components/Card.js';
import { Section } from './components/Section.js';
/*import { enableValidation } from './components/validate.js';*/
import { cardsTable, profileName, profileText, profileAvatar } from './components/modal.js';
import { animationStartFunction, animationEndFunction } from './components/utils.js';


//функция обновления лайков на сервере и локально
function handleLikeClick(id, previousLikes, card) {
  if (!previousLikes) {
    api.addLike(id) 
      .then((result) => {
        //обновляем элемент на странице
        card.setLikes(result.likes)
        //this._cardLikeValue.textContent = result.likes.length;
        //this._cardLike.classList.add('card__like-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    api.deleteLike(id)
      .then((result) => {
        //обновляем элемент на странице
        card.setLikes(result.likes)
        //this._cardLikeValue.textContent = result.likes.length;
        //this._cardLike.classList.remove('card__like-active');
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}
function handleCardClick() {}
function handleDeleteClick() {}

//функция создания разметки карточки через объект Card
function createCard(dataCard, id) {
  const card = new Card({
    data: dataCard,
    handleCardClick, //принимает (this._placeValue, this._linkValue) пока не реализована
    handleLikeClick, //принимает (this._cardId, this._checkPreviousLikes(), this)
    handleDeleteClick//принимает (this._cardId, this) //пока не реализована
  },
    '#card-template',
    id);

  const newCard = card.generate();
  return newCard;
}

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

    //отрисовка карточек с сервера через метод класса CardList
    cardList.renderItems(userData._id);

    /*  cards.forEach((cardObject) => {//добавляем карточки с сервера      
            const newCardElement = new Card({
            data: cardObject,
            handleCardClick,
            handleLikeClick,
            handleDeleteClick
          }, '#card-template',
            profileId
          );
          //отображаем на странице перед всеми карточками
          //cardsTable.prepend(newCardElement);
          cardsTable.prepend(newCardElement.createCard());
        }) */
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