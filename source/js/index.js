const withJsHidden = document.querySelectorAll('.with-js-hidden');
const withoutJs = document.querySelectorAll('.without-js-hidden');
const menuToggle = document.querySelector('.page-header__toggle');
const closeMenuToggle = document.querySelector('.page-header__close-toggle');
const menu = document.querySelector('.main-nav');
const menuHidden = true;

withJsHidden.forEach((block) => {
  block.classList.add('hidden');
});

withoutJs.forEach((block) => {
  block.classList.remove('visually-hidden');
});

menuToggle.addEventListener('click', () => {
  menu.classList.add('main-nav--js');
  menuToggle.classList.add('hidden');
  closeMenuToggle.classList.remove('hidden');
  closeMenuToggle.addEventListener('click', () => {
    menu.classList.remove('main-nav--js');
    menuToggle.classList.remove('hidden');
    closeMenuToggle.classList.add('hidden');
  })
});
