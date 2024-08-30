

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

                    if (!inputElement.validity.valid) {
                        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
                        inputElement.classList.add(inputErrorClass);
                        errorElement.textContent = inputElement.validationMessage;
                        errorElement.classList.add(errorClass);
                    } else {
                        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
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
    errorClass
}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach((inputElement) => {
        if (inputElement.classList.contains(inputErrorClass)) {
            const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
            inputElement.classList.remove(inputErrorClass);
            errorElement.classList.remove(errorClass);
            errorElement.textContent = '';
        };
    })
};