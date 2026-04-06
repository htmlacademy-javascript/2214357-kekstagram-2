import { isEscapeKey } from './util';
import { photos } from './generator';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
// const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentCount = bigPicture.querySelector('.social__comment-count');
// const totalComments = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const photoDescription = bigPicture.querySelector('.social__caption');
const buttonLoader = document.querySelector('.comments-loader');
const buttonClose = document.querySelector('.big-picture__cancel');

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
};

const onPictureCancelClick = () => {
  closeBigPicture();
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  buttonClose.removeEventListener('click', onPictureCancelClick);
}

function openBigPicture (pictureId) {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const fragment = document.createDocumentFragment();

  bigPictureImage.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';


  currentPhoto.comments.forEach((comment) => {
    const socialCommentElement = socialCommentTemplate.cloneNode(true);

    socialCommentElement.querySelector('.social__picture').src = comment.avatar;
    socialCommentElement.querySelector('.social__picture').alt = comment.name;
    socialCommentElement.querySelector('.social__text').textContent = comment.message;

    fragment.appendChild(socialCommentElement);
  });

  socialComments.appendChild(fragment);

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  buttonClose.addEventListener('click', onPictureCancelClick);
  photoDescription.textContent = currentPhoto.description;
  commentCount.classList.add('hidden');
  buttonLoader.classList.add('hidden');
}

export { openBigPicture };
