import { isEscapeKey } from '../util';
import { initScale, resetScale } from './image-scale';
import { initValidation } from './validation';
import { initEffect, resetEffect } from './slider-effect';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseUpload = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt) && (document.activeElement !== hashtagsInput || document.activeElement !== descriptionInput)) {
    closeUploadModal();
    uploadForm.reset();
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
}

const openUploadModal = () =>{
  formOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('.modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  buttonCloseUpload.addEventListener('click', onUploadCancelClick);

  initEffect();
  initScale();
  initValidation();
};

const initUploadModal = () => {
  uploadInput.addEventListener('change', () => {
    openUploadModal();
  });
};

export { initUploadModal };
