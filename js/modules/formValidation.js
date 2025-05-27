export function validateEmail(email) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/;
    return re.test(email);
}

export function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    let isValid = true;

    nameError.style.display = "none";
    emailError.style.display = "none";
    messageError.style.display = "none";

    if (nameInput.value.trim() === '') {
        nameError.textContent = "Пожалуйста, введите ваше имя";
        nameError.style.display = "block";
        isValid = false;
    }

    if (emailInput.value.trim() === '') {
        emailError.textContent = "Пожалуйста, введите email";
        emailError.style.display = "block";
        isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = "Введите корректный email";
        emailError.style.display = "block";
        isValid = false;
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = "Пожалуйста, напишите ваше сообщение";
        messageError.style.display = "block";
        isValid = false;
    }

    return isValid;
}