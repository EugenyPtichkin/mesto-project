// Элементы со значениями полей
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
// Форма ввода в DOM
const formElement = document.querySelector('.popup__form');
// Поля ввода формы в DOM
const nameInput = formElement.querySelector('.popup__input_field_name');
const jobInput = formElement.querySelector('.popup__input_field_occupation');
// Заглавие и название кнопки формы в DOM
const popupTitle = formElement.querySelector('.popup__title');
const submitBtn = formElement.querySelector('.popup__button-submit');

/* Открытие окна профиля */
const openProfileBtn = document.querySelector('.profile__button-edit');
/* Открытие окна новой карточки */
const openCardBtn = document.querySelector('.profile__button-add');
/* Закрытие окна */
const closeBtn = document.querySelector('.popup__button-close');
/* Ссылка на само окно */
const popupWin = document.querySelector('.popup');

//флаг-признак открытия попапа для добавления карточки
var cardAdd = false;

//функции по открытию-наполнению и закрытию попапа
const openProfilePopup = function () {
    cardAdd = false;//признак редакции профиля
    //перезапись параметров окна редактирования профиля
    popupTitle.textContent = 'Редактировать профиль';
    nameInput.value = profileName.textContent;
    jobInput.value = profileText.textContent;
    submitBtn.textContent = 'Сохранить';
    popupWin.classList.add('popup_opened');
};
const openCardPopup = function () {
    cardAdd = true;//признак добавления карточки
    //сброс ранее введенных значений, чтобы отобразить placeholder
    nameInput.value = '';
    jobInput.value = '';
    //перезапись параметров отображения окна ввода карточки
    popupTitle.textContent = 'Новое место';
    nameInput.placeholder = 'Название';
    jobInput.placeholder = 'Ссылка на картинку';
    submitBtn.textContent = 'Создать';
    popupWin.classList.add('popup_opened');
};
const closePopup = function () {
    cardAdd = false;
    popupWin.classList.remove('popup_opened');
};

//запуск функций по нажатию на кнопки
openProfileBtn.addEventListener('click', openProfilePopup);
openCardBtn.addEventListener('click', openCardPopup);
closeBtn.addEventListener('click', closePopup);


/* Обработчик «отправки» формы для изменения профиля или добавления карточки */
function handleFormSubmit(evt) {
    evt.preventDefault();

    //1) Обработчик изменения профиля
    if (!cardAdd) { //если открыто не добавлением карточки, то редактируем профиль 
        const nameValue = nameInput.value;
        const jobValue = jobInput.value;
        if (nameValue) {
            profileName.textContent = nameValue;
        }
        if (jobValue) {
            profileText.textContent = jobValue;
        }
    }

    //2) Обработчик добавления карточки
    if (cardAdd) {//добавляем карточку через темлпейт
        //копируем содержимое из темплейта
        const cardTemplate = document.querySelector('#card-template').content;
        const cardsTable = document.querySelector('.cards');
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        // наполняем содержимым
        const placeValue = nameInput.value;
        const urlValue = jobInput.value;
        cardElement.querySelector('.card__image').src = urlValue;
        cardElement.querySelector('.card__image').alt = `img = ${placeValue}`;
        cardElement.querySelector('.card__text').textContent = placeValue;

        /* отображаем на странице перед всеми карточками*/
        cardsTable.prepend(cardElement);

        //При появлении новой карточки вешаем ей обработчик добавления лайков
        cardElement.querySelector('.card__like').addEventListener("click", function (evt) {
            evt.target.classList.toggle('card__like-active')
        });

        //При появлении новой карточки вешаем ей обработчик удаления карточки
        cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
        });

        //При появлении новой карточки вешаем ей обработчик открытия zoom карточки и передаем информацию
        cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
            console.log('зашел в функцию')
            zoomImage.src = evt.target.closest('.card__image').src;
            zoomImage.alt = evt.target.closest('.card__image').alt;
            zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;            
            console.log('передал параметры' + zoomImage.src + zoomImage.alt + zoomTitle.textContent);
            openCardZoom();
        });
        //При появлении новой карточки обработчик закрытия zoom карточки уже есть
    }

    //Закрыть окно попапа
    closePopup();
}
// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//функция добавления начальных 6 карточек через js
function initialAddCards() {
    for (let i = 0; i < 6; i++) {
        //копируем содержимое темплейт
        const cardTemplate = document.querySelector('#card-template').content;
        const cardsTable = document.querySelector('.cards');
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

        // наполняем содержимым
        cardElement.querySelector('.card__image').src = initialCards[i].link;
        cardElement.querySelector('.card__image').alt = `img = ${initialCards[i].name}`;
        cardElement.querySelector('.card__text').textContent = initialCards[i].name;

        /* отображаем на странице перед всеми карточками*/
        cardsTable.prepend(cardElement);
    }
}
initialAddCards();


/* обслуживание Like для всех открытых карточек */
const likeBtns = [...document.querySelectorAll('.card__like')];
//перебором по всем карточкам устанавливаем слушатель клика с вызовом функции смены признака
likeBtns.forEach(item => {
    item.addEventListener("click", function (evt) {
        evt.target.classList.toggle('card__like-active');
    });
});

/* обслуживание корзины - удаление для всех открытых карточек */
const deleteBtns = [...document.querySelectorAll('.card__delete')];
//перебором по всем карточкам устанавливаем слушатель клика с вызовом функции удаления
deleteBtns.forEach(item => {
    item.addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
});

/* Открытие окна карточки при нажатии на любую из картинок */
const openCards = [...document.querySelectorAll('.card__image')];
const openCard = document.querySelector('.card__image');
/* Закрытие окна карточки */
const closeCard = document.querySelector('.popup-card__button-close');
/* Ссылка на окно карточки */
const popupCard = document.querySelector('.popup-card');
/* Свойства картинки в zoom`е */
const zoomImage = document.querySelector('.popup-card__image');
const zoomTitle = document.querySelector('.popup-card__title');

const openCardZoom = function () {
    popupCard.classList.add('popup-card_opened');
};
const closeCardZoom = function () {
    popupCard.classList.remove('popup-card_opened');
};

//открытие-закрытие окна и передача данных по нажатию на кнопки
openCards.forEach(item => {//перебором по всем карточкам устанавливаем слушатель клика с вызовом окна zoom
    item.addEventListener('click', function (evt) {
        zoomImage.src = evt.target.closest('.card__image').src;
        zoomImage.alt = evt.target.closest('.card__image').alt;
        zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
        openCardZoom();
    });
});
closeCard.addEventListener('click', closeCardZoom);


//Обслуживание анимации плавного закрытия 
// We need to keep track of faded in elements so we can apply fade out later in CSS
document.addEventListener('animationstart', function (e) {
    if (e.animationName === 'fade-in') {
        e.target.classList.add('did-fade-in');
    }
});
document.addEventListener('animationend', function (e) {
    if (e.animationName === 'fade-out') {
        e.target.classList.remove('did-fade-in');
    }
});
