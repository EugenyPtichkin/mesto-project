import { profileId } from '../index.js';
import { openPopup, closePopup, popupDelete, handleDeleteAccept } from './modal.js';
/*import { deleteCard, addLike, deleteLike } from './api.js';*/
import { api } from './api.js';

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

    //При появлении новой карточки вешаем ей обработчик лайков на сервере
    cardElement.querySelector('.card__like').addEventListener("click", function (evt) {

      //При клике по сердечку анализируем его состояние на странице и добавляем или снимаем лайк на сервере
      if (!evt.target.classList.contains('card__like-active')) {
        api.addLike(cardId)
          .then((result) => {
            //обновляем элемент на странице после успешного ответа с сервера
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
            evt.target.classList.add('card__like-active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
      else {
        api.deleteLike(cardId)
          .then((result) => {
            //обновляем элемент на странице после успешного ответа с сервера
            cardElement.querySelector('.card__like-value').textContent = result.likes.length;
            evt.target.classList.remove('card__like-active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      }
    });

    //Если карточка наша, разрешаем ее удаление и вешаем ей обработчик удаления карточки
    if (cardOwner._id === profileId) {
      cardElement.querySelector('.card__delete').addEventListener('click', function (event) {
        //открыть попап подтверждения удаления
        openPopup(popupDelete);

        handleDeleteAccept() //ожидаем промис после подтверждения нажатия клавиши
          .then(() => {
            //послать запрос на удаление с сервера  
            api.deleteCard(cardId)
              .then((result) => {
                console.log(result);
                //закрыть модальное окно после успешного ответа от сервера
                closePopup(popupDelete);
                //удалить из DOM карточку локально после успешного ответа от сервера                
                event.target.closest('.card').remove();
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

