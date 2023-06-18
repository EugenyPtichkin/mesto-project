export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupItem = document.querySelector(this._popupSelector);
        this._closeBtn = this._popupItem.querySelector('.popup__button-close');
    }
    open() {
        this._popupItem.classList.add('popup_opened');
        // Закрытие модального окна при нажатии на Esc на документе! и должна быть стрелочной иначе this=document! 
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
        // Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия и стрелочная иначе this=_popupItem
        this._popupItem.addEventListener("click", (evt) => this._closePopupModalListener(evt));
    }

    close() {
        this._popupItem.classList.remove('popup_opened');
        // Закрытие модального окна при нажатии на Esc на документе!  и должна быть стрелочной иначе this=document! 
        document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
        // Закрытие модального окна по нажатию кнопкой мыши вне окна после его открытия и стрелочная иначе this=_popupItem
        this._popupItem.removeEventListener("click", (evt) => this._closePopupModalListener(evt)); 
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