var withJsHidden = document.querySelectorAll('.with-js-hidden');
var withoutJs = document.querySelectorAll('.without-js-hidden');
var menuToggle = document.querySelector('.page-header__toggle');
var closeMenuToggle = document.querySelector('.page-header__close-toggle');
var menu = document.querySelector('.main-nav');
var menuHidden = true;

withJsHidden.forEach(function (block) {
  block.classList.add('hidden');
});

withoutJs.forEach(function (block) {
  block.classList.remove('visually-hidden');
});

menuToggle.addEventListener('click', function () {
  menu.classList.add('main-nav--js');
  menuToggle.classList.add('hidden');
  closeMenuToggle.classList.remove('hidden');
  closeMenuToggle.addEventListener('click', function () {
    menu.classList.remove('main-nav--js');
    menuToggle.classList.remove('hidden');
    closeMenuToggle.classList.add('hidden');
  })
});
