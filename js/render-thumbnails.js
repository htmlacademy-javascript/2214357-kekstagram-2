const usersPhotoList = document.querySelector('.pictures');
const thumbnails = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (userPhoto) => {
  const photoFragment = document.createDocumentFragment();

  userPhoto.forEach((photo) => {
    const photoElement = thumbnails.cloneNode(true);

    photoElement.dataset.pictureId = photo.id;
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;

    photoFragment.append(photoElement);
  });

  usersPhotoList.appendChild(photoFragment);
};

export { renderThumbnails };
