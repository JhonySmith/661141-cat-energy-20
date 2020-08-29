const withJsHidden = document.querySelectorAll('.with-js-hidden');
const withoutJs = document.querySelectorAll('.without-js-hidden');

withJsHidden.forEach((block) => {
  block.classList.add('hidden');
});

withoutJs.forEach((block) => {
  block.classList.remove('visually-hidden');
});
