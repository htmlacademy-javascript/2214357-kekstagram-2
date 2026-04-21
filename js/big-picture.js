import { isEscapeKey } from './util';

const usersPhotoList = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const totalComments = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const photoDescription = bigPicture.querySelector('.social__caption');
const buttonLoader = document.querySelector('.comments-loader');
const buttonClose = document.querySelector('.big-picture__cancel');
socialComments.innerHTML = '';

const COMMENTS__STEP = 5;
let commentCount = 0;
let currentComments = [];


const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const onPictureCancelClick = () => {
  closeBigPicture();
};

const onShowMoreButtonClick = () => {
  const renderingNewComments = currentComments.slice(commentCount, commentCount + COMMENTS__STEP);
  const newCommentsLength = renderingNewComments.length += commentCount;
  const fragment = document.createDocumentFragment();

  renderingNewComments.forEach((comment) => {
    const socialCommentElement = socialCommentTemplate.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    fragment.appendChild(socialCommentElement);
  });

  socialComments.appendChild(fragment);
  commentShownCount.textContent = `${newCommentsLength}`;
  totalComments.textContent = currentComments.length;

  if (newCommentsLength >= currentComments.length) {
    buttonLoader.classList.add('hidden');
  }
  commentCount += COMMENTS__STEP;
};

const renderComments = (currentPhotoComments) => {
  currentComments = currentPhotoComments;
  onShowMoreButtonClick();

  buttonLoader.addEventListener('click', onShowMoreButtonClick);
};

const deleteComments = () => {
  socialComments.innerHTML = '';
  commentCount = 0;
  buttonLoader.classList.remove('hidden');
  buttonLoader.removeEventListener('click', onShowMoreButtonClick);
};

const renderBigPicture = (currentPhoto) => {
  bigPictureImage.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  photoDescription.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);
};

function closeBigPicture () {
  deleteComments();

  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  buttonClose.removeEventListener('click', onPictureCancelClick);
}

const openBigPicture = (currentPhoto) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  buttonClose.addEventListener('click', onPictureCancelClick);

  renderBigPicture(currentPhoto);
};

const onPictureContainerClick = (evt, photos) => {
  const currentUserPhoto = evt.target.closest('.picture');

  if(!currentUserPhoto) {
    return;
  }

  const currentPhoto = photos.find((photo) => photo.id === Number(currentUserPhoto.dataset.pictureId));

  if(currentPhoto) {
    openBigPicture(currentPhoto);
  }
};

const setPicturesListener = (photos) => {
  usersPhotoList.addEventListener('click', (evt) => onPictureContainerClick(evt, photos));
};

export { setPicturesListener, onEscKeyDown };

