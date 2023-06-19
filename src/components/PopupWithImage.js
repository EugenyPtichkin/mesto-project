import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._zoomImage = this._popupItem.querySelector('.popup__zoom-image');
        this._zoomTitle = this._popupItem.querySelector('.popup__zoom-title');

    }
    open(imageName, imageLink) {
        super.open();
        this._zoomImage.src = imageLink;
        this._zoomImage.alt = `${imageName}`;
        this._zoomTitle.textContent = imageName;
    }
}