
export default function getInTouch() {
    // типа включил валидацию формы (проверка required)

    const submitBtn = document.querySelector('.send__form-submit');
    submitBtn.addEventListener('click', onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const inputs = document.querySelectorAll('.send__input');
    inputs.forEach(input => input.required = true);

    // ...
}
