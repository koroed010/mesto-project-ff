

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export function enableValidation ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) {
    const formList = Array.from(document.querySelectorAll(formSelector));
        formList.forEach((formElement) => {
            const inputList = Array.from(formElement.querySelectorAll(inputSelector));
            const submitButton = formElement.querySelector(submitButtonSelector);
            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', () => {
                    if (inputElement.validity.patternMismatch) {
                        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                    } else {
                        inputElement.setCustomValidity("");
                    };

                    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                    if (!inputElement.validity.valid) {
                        inputElement.classList.add(inputErrorClass);
                        errorElement.classList.add(errorClass);
                        errorElement.textContent = inputElement.validationMessage;
                    } else {
                        inputElement.classList.remove(inputErrorClass);
                        errorElement.classList.remove(errorClass);
                        errorElement.textContent = '';
                    };

                    if (inputList.some((inputElement) => {
                        return !inputElement.validity.valid;
                    })) {
                        submitButton.disabled = true;
                        submitButton.classList.add(inactiveButtonClass);
                    } else {
                        submitButton.disabled = false;
                        submitButton.classList.remove(inactiveButtonClass);
                    };
                });
            });
        });
}; 


export function clearValidation(formElement, {
    inputSelector,
    inputErrorClass,
    errorClass,
    submitButtonSelector,
    inactiveButtonClass
}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(inputErrorClass)) {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove(inputErrorClass);
            errorElement.classList.remove(errorClass);
            errorElement.textContent = '';
        };
    });
// выключаем кнопку "Сохранить" перед открытием пустой формы
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);   
};