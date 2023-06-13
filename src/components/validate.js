// ---------------------------------------------
// -- Валидация нескольких форм через функции --
// ---------------------------------------------
/*
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);  //подчеркнуть красным
  errorElement.classList.add(errorClass);       //открыть подсказку
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass); //убрать подчеркивание
  errorElement.classList.remove(errorClass);      //скрыть подсказку
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {    //проверка алфавита
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");           //стандартные сообщения
  }
  if (!inputElement.validity.valid) {             //есть ошибка ввода, показать
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {                                        //нет ошибок ввода, скрыть
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => { //хотя бы одно поле списка не имеет флаг valid=true
  return inputList.some((listItem) => {
    return !listItem.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;                        //установить свойство неактивно, чтобы заблокировать Enter
    buttonElement.classList.add(inactiveButtonClass);     //притушить кнопку submit
  } else {
    buttonElement.disabled = false;                       //снять свойство неактивно
    buttonElement.classList.remove(inactiveButtonClass);  //разрешить кнопку submit
  }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));      //отслеживать ввод на всех полях форм
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (evt) {                       //по каждому нажатию на клавишу
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);           //менять состояние кнопки submit
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); //проверять валидность ввода
    });
  });
};

export function enableValidation({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const formList = Array.from(document.querySelectorAll(formSelector)); //перебрать обе формы на странице 
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}
*/

// -------------------------
// -- Класс FormValidator --
// -------------------------
export class FormValidator {
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
    inputElement.classList.add(this.inputErrorClass); /*подчеркнуть красным*/
    errorElement.classList.add(this.errorClass); /*открыть подсказку*/
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this.formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass); /*убрать подчеркивание*/
    errorElement.classList.remove(this.errorClass); /*скрыть подсказку*/
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {/*проверка алфавита*/
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");       /*стандартные сообщения*/
    };
    if (!inputElement.validity.valid) {         /*есть ошибка ввода, показать*/
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {                                    /*нет ошибок ввода, скрыть*/
      this._hideInputError(inputElement);
    };
  }

  _hasInvalidInput(inputList) { /*хотя бы одно поле списка не имеет флаг valid=true*/
    return inputList.some((listItem) => {
      return !listItem.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;    /* установить свойство неактивно, чтобы заблокировать Enter */
      buttonElement.classList.add(this.inactiveButtonClass); /* притушить кнопку submit */
    } else {
      buttonElement.disabled = false;   /* снять свойство неактивно */
      buttonElement.classList.remove(this.inactiveButtonClass); /* разрешить кнопку submit */
    };
  }

  _setEventListeners() {
    const inputList = Array.from(this.formSelector.querySelectorAll(this.inputSelector));  /*отслеживать ввод на всех полях форм*/
    const buttonElement = this.formSelector.querySelector(this.submitButtonSelector);
    inputList.forEach( (inputElement) => { /*тут ТОЛЬКО стрелочные функции, иначе потеряем контекст this!!! */
      inputElement.addEventListener('input', () =>  { /* по каждому нажатию на клавишу */
        this._toggleButtonState(inputList, buttonElement);  /* менять состояние кнопки submit */
        this._checkInputValidity(inputElement);/* проверять валидность ввода */
      });
    });
  }

  //публичная функция
  enableValidation() {
    /*const formElement = this.formSelector;*/ /* выбрать единственную указанную форму на странице */
    this._setEventListeners();
  }
}