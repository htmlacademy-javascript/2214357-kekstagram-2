import { isEscapeKey } from './util';

const MESSAGE_TIMEOUT = 5000;

const errorLoadTemplate = document.querySelector('#data-error').content;
const errorMessage = document.querySelector('.data-error__title');
const successTemplate = document.querySelector('#success').content;
const messageErrorTemplate = document.querySelector('#error').content;

let errorMessageContainer;
let successMessageContainer;

const generateErrorMessage = (message) => {
  const errorLoad = errorLoadTemplate.cloneNode(true);

  if (message) {
    errorMessage.textContent = message;
  }

  document.body.append(errorLoad);

  const errorLoadData = document.querySelector('.data-error');

  setTimeout(() => {
    errorLoadData.remove();
  },MESSAGE_TIMEOUT);
};

const closeMessage = () => {
  if (successMessageContainer) {
    successMessageContainer.remove();
  }

  if(errorMessageContainer) {
    errorMessageContainer.remove();

  }
};

const onMessageCloseButton = (container) => {
  container.remove();
};

const onEscKeyDownMessage = (evt) => {
  if (isEscapeKey(evt)) {
    closeMessage();
    document.body.removeEventListener('keydown', onEscKeyDownMessage);
  }
};

const onBodyCanselClick = (evt) => {
  if(evt.target === successMessageContainer || errorMessageContainer) {
    closeMessage();
    document.body.removeEventListener('click', onBodyCanselClick);
  }
};

const showSuccessMessage = () => {
  const successLoad = successTemplate.cloneNode(true);
  successMessageContainer = successLoad.querySelector('.success');
  const successMessageButton = successLoad.querySelector('.success__button');

  document.body.append(successLoad);
  successMessageButton.addEventListener('click', () => onMessageCloseButton(successMessageContainer));
  document.body.addEventListener('keydown', onEscKeyDownMessage);
  document.body.addEventListener('click', onBodyCanselClick);
};

const showErrorMessage = () => {
  const errorLoad = messageErrorTemplate.cloneNode(true);
  errorMessageContainer = errorLoad.querySelector('.error');
  const errorMessageButton = errorLoad.querySelector('.error__button');

  document.body.append(errorLoad);
  errorMessageButton.addEventListener('click', () => onMessageCloseButton(errorMessageContainer));
  document.body.addEventListener('keydown', onEscKeyDownMessage);
  document.body.addEventListener('click', onBodyCanselClick);
};

export { generateErrorMessage, showSuccessMessage, showErrorMessage, errorMessageContainer };
