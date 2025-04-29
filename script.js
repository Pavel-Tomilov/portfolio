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

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.switch__input');
    const html = document.documentElement;
    
    // Устанавливаем начальное состояние переключателя
    themeToggle.checked = html.classList.contains('dark-theme');
    
    // Обработчик переключения темы
    themeToggle.addEventListener('change', function() {
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


