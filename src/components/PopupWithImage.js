import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {  //{ imageName, imageLink }
        super(popupSelector);
        //this._imageName = imageName;
        //this._imageLink = imageLink;
        //this._imageSelector = document.querySelector('.card__image');
        //this._zoomPopup = document.querySelector('.popup_zoom');
        //this._zoomImage = this._zoomPopup.querySelector('.popup__zoom-image');
        //this._zoomTitle = this._zoomPopup.querySelector('.popup__zoom-title');
        this._zoomImage = this._popupItem.querySelector('.popup__zoom-image');
        this._zoomTitle = this._popupItem.querySelector('.popup__zoom-title');

    }
    open(imageName, imageLink) {
        super.open();
        //zoomImage.src = evt.target.closest('.card__image').src;
        //zoomImage.alt = evt.target.closest('.card__image').alt;
        //zoomTitle.textContent = evt.target.closest('.card__image').nextElementSibling.textContent;
        this._zoomImage.src = imageLink;
        this._zoomImage.alt = `${imageName}`;
        this._zoomTitle.textContent = imageName;
    }
}