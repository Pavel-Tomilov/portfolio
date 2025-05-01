document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 20,
      behavior: 'smooth'
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.querySelector('.switch__input');
  const html = document.documentElement;

  // Устанавливаем начальное состояние переключателя
  themeToggle.checked = html.classList.contains('dark-theme');

  // Обработчик переключения темы
  themeToggle.addEventListener('change', function () {
    if (this.checked) {
      html.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });

  // Следим за изменением системных настроек
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newSystemPrefersDark = e.matches;
      html.classList.toggle('dark-theme', newSystemPrefersDark);
      themeToggle.checked = newSystemPrefersDark;
    }
  });
});

const burgerMenu = document.querySelector('.burger-menu');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

burgerMenu.addEventListener('click', function () {
  this.classList.toggle('active');
  nav.classList.toggle('active');
  overlay.classList.toggle('active');

  // Блокировка прокрутки страницы при открытом меню
  if (nav.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  }

  else {
    document.body.style.overflow = '';
  }
});

// Закрытие меню при клике на оверлей
overlay.addEventListener('click', function () {
  burgerMenu.classList.remove('active');
  nav.classList.remove('active');
  this.classList.remove('active');
  document.body.style.overflow = '';
});

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    burgerMenu.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

const btn = document.getElementById('btn');
const modal = document.getElementById('modal');
const closeBtn = modal.querySelector('.modal__close');

// Открытие модального окна
btn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Закрытие при клике на крестик
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Закрытие при клике вне окна
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


