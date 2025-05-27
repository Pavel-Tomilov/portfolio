export function initModal() {
    const btn = document.getElementById('btn');
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.modal__close');

    btn.addEventListener('click', () => modal.style.display = 'flex');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}