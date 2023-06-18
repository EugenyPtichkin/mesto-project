/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
export function animationStartFunction() {
  document.addEventListener('animationstart', function (evt) {
    if (evt.animationName === 'fade-in') {
      evt.target.classList.add('did-fade-in');
    }
  });
}
export function animationEndFunction() {
  document.addEventListener('animationend', function (evt) {
    if (evt.animationName === 'fade-out') {
      evt.target.classList.remove('did-fade-in');
    }
  });
}

/* -------------------------------- */
/* -- Проверка ответа от сервера -- */
/* -------------------------------- */
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

/* ---------------------- */
/* -- Запрос к серверу -- */
/* ---------------------- */
export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
}

/* ------------------------------------------------- */
/* -- Смена надписи кнопки при общении с сервером -- */
/* ------------------------------------------------- */
// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

/* -------------------------------------------------------------------------------------------------------- */
/* -- Универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки -- */
/* -------------------------------------------------------------------------------------------------------- */
// можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // любую форму нужно очищать после успешного ответа от сервера
      // а так же `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
      evt.target.reset();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
