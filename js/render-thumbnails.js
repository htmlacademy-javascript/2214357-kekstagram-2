const usersPhotoList = document.querySelector('.pictures');
const thumbnails = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (userPhoto) => {
  const photoFragment = document.createDocumentFragment();

  userPhoto.forEach(({id, url, description, comments, likes }) => {
    const photoElement = thumbnails.cloneNode(true);

    photoElement.dataset.pictureId = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    photoFragment.append(photoElement);
  });

  usersPhotoList.appendChild(photoFragment);
};

export { renderThumbnails };
