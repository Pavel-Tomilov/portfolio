export function initThemeSwitcher() {
    const themeToggle = document.querySelector('.switch__input');
    const html = document.documentElement;

    themeToggle.checked = html.classList.contains('dark-theme');

    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            html.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            const newSystemPrefersDark = e.matches;
            html.classList.toggle('dark-theme', newSystemPrefersDark);
            themeToggle.checked = newSystemPrefersDark;
        }
    });
}