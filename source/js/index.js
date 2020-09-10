const withJsHidden = document.querySelectorAll('.with-js-hidden');
const withoutJs = document.querySelectorAll('.without-js-hidden');
const menuToggle = document.querySelector('.page-header__toggle');

withJsHidden.forEach((block) => {
  block.classList.add('hidden');
});

withoutJs.forEach((block) => {
  block.classList.remove('visually-hidden');
});

