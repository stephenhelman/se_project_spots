const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const { inputErrorClass, errorClass } = settings;
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export const disableButton = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

export const enableButton = (button, inactiveButtonClass) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const { inputSelector, submitButtonSelector, inactiveButtonClass } = settings;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = (settings) => {
  const { formSelector, fieldsetSelector } = settings;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset, settings);
    });
  });
};

export const resetValidation = (formElement, settings, submitButton) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputList.forEach((input) => {
    hideInputError(formElement, input, settings);
  });
  enableButton(submitButton, config.inactiveButtonClass);
};

export const config = {
  formSelector: ".modal__form",
  fieldsetSelector: ".modal__fieldset",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__form-submit",
  inactiveButtonClass: "modal__form-submit_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error_active",
};

enableValidation(config);
