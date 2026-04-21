import { isEscapeKey } from './util';
import { errorText, validHashtags, validComment } from './validate-form';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const formOverlay = uploadForm.querySelector('.img-upload__overlay');
const buttonCloseUpload = uploadForm.querySelector('.img-upload__cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');


const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(document.activeElement === hashtagsInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      closeUploadModal();
      uploadForm.reset();
    }
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
  uploadInput.value = '';
  commentInput.value = '';
}

const uploadModal = () => {
  uploadInput.addEventListener('change', () => {
    formOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('.modal-open');
    document.addEventListener('keydown', onEscKeyDown);
    buttonCloseUpload.addEventListener('click', onUploadCancelClick);
  });
};

const pristineHashtags = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const pristineComment = new Pristine(uploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristineHashtags.addValidator(hashtagsInput, validHashtags, errorText);
pristineComment.addValidator(commentInput, validComment, errorText);

export { uploadModal };
