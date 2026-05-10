import { renderThumbnails } from './render-thumbnails';
import { debounce } from './util';

const MAX_COUNT_PICTURE = 10;

const filterContainer = document.querySelector('.img-filters');
const filterDefault = 'filter-default';
const filterRandom = 'filter-random';
const filterDiscussed = 'filter-discussed';

const debounceRenderPicture = debounce(renderThumbnails, 500);

const filterData = (newFilter, pictures) => {
  let picturesFilter = [];

  switch (newFilter) {
    case filterDefault:
      picturesFilter = pictures;
      break;
    case filterRandom:
      picturesFilter = pictures.toSorted(() => Math.random() > 0.5).slice(0, MAX_COUNT_PICTURE);
      break;
    case filterDiscussed:
      picturesFilter = pictures.toSorted((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      throw new Error(`Unknown filter: ${newFilter}`);
  }

  return picturesFilter;
};

const onFilterClick = (evt, picturesData) => {
  const activButton = document.querySelector('.img-filters__button--active');
  const targetButton = evt.target;

  if (!targetButton.matches('button') || activButton === targetButton) {
    return;
  }

  activButton.classList.remove('img-filters__button--active');
  targetButton.classList.add('img-filters__button--active');

  const filteredData = filterData(targetButton.id, picturesData);

  debounceRenderPicture(filteredData);
};

const initFilter = (picturesData) => {
  filterContainer.classList.remove('img-filters--inactive');
  filterContainer.addEventListener('click', (evt) => onFilterClick(evt, picturesData));
};

export { initFilter };


