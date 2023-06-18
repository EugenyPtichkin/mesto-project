import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._formItem = this._popupItem.querySelector('.popup__form');   
        this._formSubmitButton = this._formItem.querySelector('.popup__button-submit');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formSubmitButton.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            this._handleSubmit();
        })
    }
}