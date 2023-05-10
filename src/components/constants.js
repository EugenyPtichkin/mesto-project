/* 6 карточек из коробки */
const arhyzImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kholmogorskiyImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Архыз',
    link: arhyzImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'*/
  },
  {
    name: 'Челябинская область',
    link: chelyabinskImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'*/
  },
  {
    name: 'Иваново',
    link: ivanovoImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'*/
  },
  {
    name: 'Холмогорский район',
    link: kholmogorskiyImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'*/
  },
  {
    name: 'Камчатка',
    link: kamchatkaImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'*/
  },
  {
    name: 'Байкал',
    link: baikalImage
    /*'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'*/
  }
];