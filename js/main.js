import { getData } from './load-data';
import { generateErrorMessage } from './messages.js';
import { renderThumbnails } from './render-thumbnails';
import { setPicturesListener } from './big-picture';
import { initUploadModal } from './form/image-form';

const bootstrap = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    setPicturesListener(photos);
    initUploadModal();
  }catch(error) {
    generateErrorMessage();
  }
};

bootstrap();
