import { validateForm } from './formValidation.js';

export async function sendToEmail(data) {
    try {
        const response = await fetch('https://formspree.io/f/mjkwodgq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': window.location.origin
            },
            mode: 'cors',
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                _replyto: data.email,
                _gotcha: ''
            })
        });
        return response.ok;
    } catch (error) {
        console.error("Ошибка:", error);
        return false;
    }
}

export function initFormSubmit() {
    const form = document.getElementById('form');
    const loading = document.getElementById('loading');
    const loader = loading.querySelector('.loader');
    const loadingText = loading.querySelector('.loading-text');
    const successMessage = loading.querySelector('.success-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        loading.style.display = "flex";
        loader.style.display = "block";
        loadingText.style.display = "block";
        successMessage.style.display = "none";

        const formData = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            message: form.message.value.trim()
        };

        try {
            const isSent = await sendToEmail(formData);
            await new Promise(resolve => setTimeout(resolve, 3000));

            if (isSent) {
                loader.style.display = "none";
                loadingText.style.display = "none";
                successMessage.style.display = "block";
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
}