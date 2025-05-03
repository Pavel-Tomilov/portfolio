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


const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMsg = document.getElementById('success');
const loading = document.getElementById('loading');
const loadingText = loading.querySelector('.loading-text');
const successMessage = loading.querySelector('.success-message');
const loader = loading.querySelector('.loader');

// Валидация email
function validateEmail(email) {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
  return re.test(email);
}

// Проверка формы
function validateForm() {
  let isValid = true;

  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  if (nameInput.value.trim() === '') {
    nameError.textContent = "Пожалуйста, введите ваше имя";
    nameError.style.color = "red";
    nameError.style.display = "block";
    isValid = false;
  }

  if (emailInput.value.trim() === '') {
    emailError.textContent = "Пожалуйста, введите email";
    emailError.style.color = "red";
    emailError.style.display = "block";
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Введите корректный email";
    emailError.style.color = "red";
    emailError.style.display = "block";
    isValid = false;
  }

  if (messageInput.value.trim() === '') {
    messageError.textContent = "Пожалуйста, напишите ваше сообщение";
    messageError.style.color = "red";
    messageError.style.display = "block";
    isValid = false;
  }

  return isValid;
}

// Отправка в Telegram
async function sendToTelegram(data) {
  const botToken = "";
  const chatId = "";
  const text = `📌 Новая заявка:\n\n👤 Имя: ${data.name}\n📧 Email: ${data.email}\n📝 Сообщение: ${data.message}`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const params = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return response.ok;
  } catch (error) {
    console.error("Ошибка отправки:", error);
    return false;
  }
}

// Обработка формы
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateForm()) return;


  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  // Показываем окно загрузки
  loading.style.display = "flex";
  loader.style.display = "block";
  loadingText.style.display = "block";
  successMessage.style.display = "none";

  const formData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  try {
    const isSent = await sendToTelegram(formData);

    // Искусственная задержка 3 секунды
    await new Promise(resolve => setTimeout(resolve, 3000));

    if (isSent) {
      // Показываем сообщение об успехе вместо спиннера
      loader.style.display = "none";
      loadingText.style.display = "none";
      successMessage.style.display = "block";
      // Закрываем окно через 3 секунды
      setTimeout(() => {
        loading.style.display = "none";
        form.reset();
      }, 3000);
    } else {
      loading.style.display = "none";
      alert("Ошибка отправки. Попробуйте позже.");
    }
  } catch (error) {
    console.error("Ошибка:", error);
    loading.style.display = "none";
    alert("Произошла ошибка. Попробуйте ещё раз.");
  } finally {
    submitBtn.disabled = false;
  }
});