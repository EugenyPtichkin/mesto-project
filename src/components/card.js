import { profileId } from '../index.js';
import { cardsTable, openPopup, closePopup, popupDelete, buttonDelete, handleDeleteAccept } from './modal.js';
import { getInitialCards, deleteCard, addLike, deleteLike } from './api.js';

// Ссылка на zoom окна карточки и свойства картинки в zoom`е находятся однократно
const zoomPopup = document.querySelector('.popup_zoom');
const zoomImage = zoomPopup.querySelector('.popup__zoom-image');
const zoomTitle = zoomPopup.querySelector('.popup__zoom-title');

/* -------------------------------------------------------- */
/* -- Функция добавления карточки со всеми обработчиками -- */
/* -------------------------------------------------------- */
export function createCard(placeValue, linkValue, cardId, cardLikes, cardOwner) {
  //копируем содержимое из темплейта
  const cardTemplate = document.querySelector('#card-template').content;

  if (linkValue) { //добавить карточку если ссылка непустая
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
    cardElement.querySelector('.card__text').textContent = placeValue;
    cardElement.querySelector('.card__like-value').textContent = cardLikes.length;

    //Если при открытии страницы уже есть лайки от текущего пользователя, то отобразить эти лайки как активные
    const myLikeFound = cardLikes.some((item) => {
      return item._id === profileId;
    });
    if (myLikeFound) {
      cardElement.querySelector('.card__like').classList.add('card__like-active');
    }

    //При появлении новой карточки вешаем ей обработчик добавления лайков
    cardElement.querySelector('.card__like').addEventListener("click", function (evt) {
      evt.target.classList.toggle('card__like-active');

      //Обновляем информацию о лайках на сервере - добавляем или снимаем лайк
      if (evt.target.classList.contains('card__like-active')) {
        addLike(cardId)
          .then((result) => {
            // отображаем результат
            console.log(result);
            //обновляем элемент на странице
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
      else {
        deleteLike(cardId)
          .then((result) => {
            // отображаем результат
            console.log(result);
            //обновляем элемент на странице
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
    });

    //Если карточка наша, разрешаем ее удаление и вешаем ей обработчик удаления карточки
    if (cardOwner._id === profileId) {
      cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
        //открыть попап подтверждения удаления
        openPopup(popupDelete);

        handleDeleteAccept(buttonDelete)
          .then(() => {
            //закрыть модальное окно
            closePopup(popupDelete);
            //удалить из DOM карточку локально
            evt.target.closest('.card').remove();

            //послать запрос на удаление с сервера  
            deleteCard(cardId) //не понял почему сработало удаление, ведь cardId не хранится нигде глобально для каждой карточки!
              .then((result) => {
                // отображаем результат
                console.log(result);
              })
              .catch((err) => {
                console.log(err); // выводим ошибку в консоль
              });
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      });
    }
    else {
      //скрыть корзину на чужих карточках 
      cardElement.querySelector('.card__delete').classList.add('card__delete_hidden');
    }

    //При появлении новой карточки вешаем ей обработчик открытия zoom карточки по нажатию на картинку 
    //передаем информацию для отображения
    cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
      zoomImage.src = evt.target.closest('.card__image').src;
      zoomImage.alt = evt.target.closest('.card__image').alt;
      zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
      openPopup(zoomPopup);
    });

    return cardElement;
  }
  else {
    return '';
  }
}

/* ----------------------------------------------------- */
/* -- Функция добавления начальных карточек с сервера -- */
/* ----------------------------------------------------- */
export function initialAddCards() {
  getInitialCards()
    .then((result) => {
      // отображаем результат в логе
      console.log(result);
      result.forEach((cardObject) => {
        //добавляем карточки с сервера
        const newCardElement = createCard(cardObject.name, cardObject.link, cardObject._id, cardObject.likes, cardObject.owner);
        //отображаем на странице перед всеми карточками
        cardsTable.prepend(newCardElement);
      });

    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}