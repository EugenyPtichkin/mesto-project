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