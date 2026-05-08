import { isEscapeKey } from '../util';
import { initScale, resetScale } from './image-scale';
import { initValidation, validateForm } from './validation';
import { initEffect, resetEffect } from './slider-effect';
import { sendData } from '../load-data';
import { generateErrorMessage, showSuccessMessage, showErrorMessage, hasErrorMessage } from '../messages';

const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif'];

const uploadForm = document.querySelector('.img-upload__form');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseUpload = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const fileChooser = document.querySelector('.img-upload__wrapper input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const uploadFormEffects = uploadForm.querySelectorAll('.effects__preview');

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt) && (document.activeElement !== hashtagsInput || document.activeElement !== descriptionInput) && !hasErrorMessage) {
    closeUploadModal();
  }
};

const onUploadCancelClick = () => {
  closeUploadModal();
};

function closeUploadModal () {
  formOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  buttonCloseUpload.removeEventListener('click', onUploadCancelClick);

  resetEffect();
  resetScale();
  uploadForm.reset();
  fileChooser.reset();
  // При повторной попытке отправить неверный формата файла ошибка не появляется. Подскажи как реализовать.
}

const openUploadModal = () => {
  formOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  buttonCloseUpload.addEventListener('click', onUploadCancelClick);

  initEffect();
  initScale();
  initValidation();
};

function onFileChooserChange () {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    uploadFormEffects.forEach((item) => {
      item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }else {
    generateErrorMessage();
    return;
  }

  openUploadModal();
}

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    try {
      await sendData(new FormData(evt.target));
      closeUploadModal();
      showSuccessMessage();
    } catch (error) {
      showErrorMessage();
    }
  }
};

const initUploadModal = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
  fileChooser.addEventListener('change', onFileChooserChange);
};

export { initUploadModal };
