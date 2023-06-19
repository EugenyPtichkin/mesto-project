//кнопка открытия окна профиля
export const openProfileBtn = document.querySelector('.profile__button-edit');
//const profilePopup = document.querySelector('.popup_profile');
//export const profileInputs = profilePopup.querySelectorAll('.popup__input');

//редакция аватара профиля по нажатию на кнопку под аватаром
export const newAvatarBtn = document.querySelector('.profile__button-avatar');

//кнопка открытия окна новой карточки
export const openCardBtn = document.querySelector('.profile__button-add');

//ссылка на окно удаления карточки
const popupDelete = document.querySelector('.popup_delete');
//кнопка подтверждения
export const buttonDelete = popupDelete.querySelector('.popup__button-submit');

//объект входных данных валидатора
export const validatorObject= {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button-submit_inactive',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input-error_active'
  };

//ссылка на формы открывающихся окон
export const addSelector =document.querySelector('.popup_add');
export const profileSelector = document.querySelector('.popup_profile');
export const avatarSelector = document.querySelector('.popup_avatar-update');
  