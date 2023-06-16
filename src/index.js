import './pages/index.css'; // импорт главного файла стилей
import { api } from './components/Api.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
//import { cardsTable, profileName, profileText, profileAvatar } from './components/modal.js';
import { animationStartFunction, animationEndFunction } from './components/utils.js';

// Элементы из страницы со значениями полей текущего профиля
export const profileName = document.querySelector('.profile__name');
export const profileText = document.querySelector('.profile__text');
export const profileAvatar = document.querySelector('.profile__image');

//функция обновления лайков на сервере а затем локально
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
//создть экземпляр класса, обращаться к классу нельзя, только к экземпляру!
const popupWithImage = new PopupWithImage('.popup_zoom');
popupWithImage.setEventListeners();//cлушатель на крестик


//функция откртия карточки при клике на нее
function handleCardClick(cardName, cardLink) {
  popupWithImage.open(cardName, cardLink);
}

function handleDeleteClick() {}

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

/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
animationStartFunction();
animationEndFunction();