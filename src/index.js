import './pages/index.css'; // добавьте импорт главного файла стилей
import { enableValidation } from './components/validate.js';
import { createCard, initialAddCards } from './components/card.js';
import { closePopup, formCardElement, placeInput, linkInput, cardPopup } from './components/modal.js';

//определяем место вставки новой карточки глобально вне функции
export const cardsTable = document.querySelector('.cards');

/* ------------------------------------------------------- */
/* -- Добавление карточек программно из набора констант -- */
/* ------------------------------------------------------- */
initialAddCards(); //запускаем функцию однократно

/* -------------------------------------------------- */
/* -- Включение валидации вызовом enableValidation -- */
/* -- все настройки передаются при вызове          -- */
/* -------------------------------------------------- */
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
});

/* --------------------------------------------------------- */
/* -- Обработчик «отправки» формы для добавления карточки -- */
/* --------------------------------------------------------- */
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