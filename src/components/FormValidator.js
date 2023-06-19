// -------------------------
// -- Класс FormValidator --
// -------------------------
export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formSelector) {
    this.formSelector = formSelector;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
  }

  //приватные функции
  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass); //подчеркнуть красным
    errorElement.classList.add(this.errorClass); //открыть подсказку
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass); //убрать подчеркивание
    errorElement.classList.remove(this.errorClass); //скрыть подсказку
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {//проверка алфавита
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");       //стандартные сообщения
    };
    if (!inputElement.validity.valid) {         //есть ошибка ввода, показать
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {                                    //нет ошибок ввода, скрыть
      this._hideInputError(inputElement);
    };
  }

  _hasInvalidInput() { //хотя бы одно поле списка не имеет флаг valid=true
    return this._inputList.some((listItem) => {
      return !listItem.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;    // установить свойство неактивно, чтобы заблокировать Enter
      this._buttonElement.classList.add(this.inactiveButtonClass); // притушить кнопку submit
    } else {
      this._buttonElement.disabled = false;   // снять свойство неактивно
      this._buttonElement.classList.remove(this.inactiveButtonClass); // разрешить кнопку submit 
    };
  }

  _setEventListeners() {
    this._inputList = Array.from(this.formSelector.querySelectorAll(this.inputSelector));  //отслеживать ввод на всех полях форм
    this._buttonElement = this.formSelector.querySelector(this.submitButtonSelector);
    this._inputList.forEach((inputElement) => { // тут ТОЛЬКО стрелочные функции, иначе потеряем контекст this!!!
      inputElement.addEventListener('input', () => {  // по каждому нажатию на клавишу 
        this._toggleButtonState();                    // менять состояние кнопки submit   
        this._checkInputValidity(inputElement);       // проверять валидность ввода 
      });
    });
  }

  //публичные функции  
  resetValidation() { 
    this._buttonElement.disabled = true;    // установить свойство неактивно, чтобы заблокировать Enter
    this._buttonElement.classList.add(this.inactiveButtonClass); // притушить кнопку submit 

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}