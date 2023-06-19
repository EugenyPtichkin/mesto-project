import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._formItem = this._popupItem.querySelector('.popup__form');      // форма ввода профиля в DOM
        this._formInputs = this._formItem.querySelectorAll('.popup__input'); // все поля ввода формы профиля в DOM
        this._formSubmitButton = this._formItem.querySelector('.popup__button-submit');// кнопка отправки
        this._submitBtnText = this._formSubmitButton.textContent;
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._formSubmitButton.textContent = loadingText;
        } else {
            this._formSubmitButton.textContent = this._submitBtnText;
        }
    }

    close() {
        super.close();
        this._formItem.reset(); //дополнительно сбрасываем форму при закрытии
    }

    _getInputValues() {  //перебирая по всем полям ввода создаем объекты имя: значение
        const formInputsValues = {};  //объявить объект и обнулить, чтобы не ругался        
        this._formInputs.forEach((input) => {
            formInputsValues[input.name] = input.value;
        });
        return formInputsValues;
    }

    setInputValues(data) {  //перебирая по всем полям ввода устанавливаем исходные значения
        this._formInputs.forEach((input) => {
            input.value = data[input.name];
        });        
    }

    setEventListeners() {
        super.setEventListeners();
        this._formItem.addEventListener('submit', (evt) => { //дополнительно вызываем внешний метод отправки данных формы
            evt.preventDefault();
            this._handleSubmit(this._getInputValues(), evt);
        })
    }
}