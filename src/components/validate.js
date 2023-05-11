/* ------------------------------- */
/* -- Валидация нескольких форм -- */
/* ------------------------------- */
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);   /*подчеркнуть красным*/
    errorElement.classList.add(errorClass); /*открыть подсказку*/
    errorElement.textContent = errorMessage;
  };
  
  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass); /*убрать подчеркивание*/
    errorElement.classList.remove(errorClass);/*скрыть подсказку*/
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {/*проверка алфавита*/
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");       /*стандартные сообщения*/
    }
    if (!inputElement.validity.valid) {         /*есть ошибка ввода, показать*/
      showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);  
    } else {                                    /*нет ошибок ввода, скрыть*/
      hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  const hasInvalidInput = (inputList) => { /*хотя бы одно поле списка не имеет флаг valid=true*/
    return inputList.some((listItem) => {
      return !listItem.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) { 
      buttonElement.disabled = true;    /* установить свойство неактивно, чтобы заблокировать Enter */ 
      buttonElement.classList.add(inactiveButtonClass); /* притушить кнопку submit */
    } else {                            
      buttonElement.disabled = false;   /* снять свойство неактивно */ 
      buttonElement.classList.remove(inactiveButtonClass); /* разрешить кнопку submit */
    }
  }
  
  const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => { 
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));  /*отслеживать ввод на всех полях форм*/
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) { /* по каждому нажатию на клавишу */
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);  /* менять состояние кнопки submit */
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);/* проверять валидность ввода */
      });
    });
  };
  
  export function enableValidation({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {    
    const formList = Array.from(document.querySelectorAll(formSelector));/* перебрать обе формы на странице */
    formList.forEach((formElement) => {
      setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
  }

  