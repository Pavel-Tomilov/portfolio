import { initSmoothScroll } from './modules/smoothScroll.js';
import { initThemeSwitcher } from './modules/themeSwitcher.js';
import { initBurgerMenu } from './modules/burgerMenu.js';
import { initModal } from './modules/modal.js';
import { initFormSubmit } from './modules/formSubmit.js';

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initThemeSwitcher();
  initBurgerMenu();
  initModal();
  initFormSubmit();
});