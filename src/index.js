import './pages/index.css'; // импорт главного файла стилей
import { getUserInfo } from './components/api.js';
import { initialAddCards } from './components/card.js';
import { enableValidation } from './components/validate.js';
import { profileName, profileText, profileAvatar } from './components/modal.js';
import { animationStartFunction, animationEndFunction } from './components/utils.js';

//id профиля пользователя храним глобально
export let profileId = '';

/* ------------------------------------------------------------- */
/* -- Загрузка информации о пользователе до загрузки карточек -- */
/* ------------------------------------------------------------- */
getUserInfo()
  .then((result) => {    
    // отображаем результат на странице
    profileName.textContent = result.name;
    profileText.textContent = result.about;
    profileAvatar.src = result.avatar;
    profileId = result._id;
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

/* ---------------------------------------------- */
/* -- Добавление карточек программно с сервера -- */
/* ---------------------------------------------- */
initialAddCards(); //запускаем функцию однократно

/* -------------------------------------------------- */
/* -- Включение валидации вызовом enableValidation -- */
/* -------------------------------------------------- */
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
});

/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
animationStartFunction();
animationEndFunction();