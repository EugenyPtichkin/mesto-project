import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._formElement = this._popupItem.querySelector('.popup__form');      // форма ввода профиля в DOM
        this._formInputs = this._formElement.querySelectorAll('.popup__input'); // все поля ввода формы профиля в DOM
        this._formSubmitButton = this._formElement.querySelector('.popup__button-submit');// кнопка отправки
    }

    close() {
        super.close();
        this._formElement.reset(); //дополнительно сбрасываем форму
    }

    _getInputValues() {  //перебирая по всем полям ввода создаем объект имя: значение
        this._formInputs.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        const form_values = this._getInputValues();
        this._formElement.addEventListener('submit', (evt) => { //дополнительно вызываем внешний метод отправки данных формы
            evt.preventDefault();
            this._handleSubmit(form_values);
        })

    }

}