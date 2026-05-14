import { isEscapeKey } from './util';

const MESSAGE_TIMEOUT = 5000;

const errorLoadTemplate = document.querySelector('#data-error').content;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

let errorMessageContainer = null;
let successMessageContainer = null;

const generateErrorMessage = (message) => {
  const errorLoad = errorLoadTemplate.cloneNode(true);

  if (message) {
    errorLoad.querySelector('.data-error__title').textContent = message;
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
    return;
  }

  if(errorMessageContainer) {
    errorMessageContainer.remove();
    return;
  }

  document.body.removeEventListener('click', onBodyCancelClick);
  document.body.removeEventListener('keydown', onEscKeyDownMessage);
  errorMessageContainer = null;
  successMessageContainer = null;
};


const onMessageCloseButton = (container) => {
  container.remove();
};

function onEscKeyDownMessage (evt) {
  if (isEscapeKey(evt)) {
    closeMessage();
  }
}

function onBodyCancelClick (evt) {
  if(evt.target === successMessageContainer || evt.target === errorMessageContainer) {
    closeMessage();
  }
}

const hasErrorMessage = () => errorMessageContainer !== null;

const showPopupMessage = (node) => {
  const button = node.querySelector('button');

  document.body.append(node);
  button.addEventListener('click', () => onMessageCloseButton(node));
  document.body.addEventListener('click', onBodyCancelClick);
  document.body.addEventListener('keydown', onEscKeyDownMessage);
};

const showSuccessMessage = () => {
  const successNode = successTemplate.cloneNode(true);
  successMessageContainer = successNode;

  showPopupMessage(successNode);
};

const showErrorMessage = () => {
  const errorNode = messageErrorTemplate.cloneNode(true);
  errorMessageContainer = errorNode;

  showPopupMessage(errorNode);
};

export { generateErrorMessage, showSuccessMessage, showErrorMessage, hasErrorMessage, closeMessage };
