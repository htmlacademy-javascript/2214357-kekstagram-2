import { photos } from './generator';
import { renderThumbnails, usersPhotoList } from './render-thumbnails';

renderThumbnails(photos);

import { openBigPicture } from './big-picture';

usersPhotoList.addEventListener('click', (evt) => {
  const currentUserPhoto = evt.target.closest('.picture');

  if (currentUserPhoto) {
    openBigPicture(currentUserPhoto.dataset.pictureId);
  }
});


