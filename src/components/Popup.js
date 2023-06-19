export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupItem = document.querySelector(this._popupSelector);
        this._closeBtn = this._popupItem.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupModalListener = this._closePopupModalListener.bind(this);
    }
    open() {
        this._popupItem.classList.add('popup_opened');
        // Закрытие модального окна при нажатии на Esc на документе! и должна быть стрелочной иначе this=document! 
        document.addEventListener('keydown', this._handleEscClose);
        // Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия и стрелочная иначе this=_popupItem
        this._popupItem.addEventListener("click", this._closePopupModalListener);
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        // Закрытие модального окна при нажатии на Esc на документе!  и должна быть стрелочной иначе this=document! 
        document.removeEventListener('keydown', this._handleEscClose);
        // Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия и стрелочная иначе this=_popupItem
        this._popupItem.removeEventListener("click", this._closePopupModalListener); 
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closePopupModalListener(evt) {
        if (evt.currentTarget === evt.target) {
            this.close(); 
        }
    }

    setEventListeners() {
        this._closeBtn.addEventListener('click', () => this.close()); //должна быть стрелочная функция иначе контекст this становтся _closeBtn
    }
}