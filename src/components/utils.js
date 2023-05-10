/* --------------------------------------------- */
/* -- Обслуживание анимации плавного закрытия -- */
/* --------------------------------------------- */
document.addEventListener('animationstart', function (evt) {
    if (evt.animationName === 'fade-in') {
      evt.target.classList.add('did-fade-in');
    }
  });
  document.addEventListener('animationend', function (evt) {
    if (evt.animationName === 'fade-out') {
      evt.target.classList.remove('did-fade-in');
    }
  });
  