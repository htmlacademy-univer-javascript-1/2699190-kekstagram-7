import {isEscapeKey} from './util.js';

const DATA_ERROR_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showMessage = (template, innerSelector, buttonSelector) => {
  const message = template.cloneNode(true);

  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  message.querySelector(buttonSelector).addEventListener('click', () => {
    closeMessage();
  });

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(innerSelector)) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.body.append(message);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, '.success__inner', '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorTemplate, '.error__inner', '.error__button');
};

const isErrorMessageShown = () => Boolean(document.querySelector('.error'));

const showDataError = () => {
  const dataError = dataErrorTemplate.cloneNode(true);
  document.body.append(dataError);

  setTimeout(() => {
    dataError.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export {showSuccessMessage, showErrorMessage, isErrorMessageShown, showDataError};
