import { generatePhotos } from './generator';
import { renderThumbnails } from './render-thumbnails';
import { setPicturesListener } from './big-picture';
import { initUploadModal } from './form/image-form';

const photos = generatePhotos();
renderThumbnails(photos);
setPicturesListener(photos);
initUploadModal();


