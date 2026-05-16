import { getData } from './load-data';
import { generateErrorMessage } from './messages.js';
import { renderThumbnails } from './render-thumbnails';
import { setPicturesListener } from './big-picture';
import { initUploadModal } from './form/image-form';
import { initFilter } from './filter.js';
import { initValidation } from './form/validation';

const bootstrap = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    setPicturesListener(photos);
    initFilter(photos);
    initUploadModal();
    initValidation();
  } catch(error) {
    generateErrorMessage();
  }
};

bootstrap();
