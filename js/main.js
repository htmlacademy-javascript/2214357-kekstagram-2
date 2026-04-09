import { generatePhotos } from './generator';
import { renderThumbnails } from './render-thumbnails';
import { setPicturesListener } from './big-picture';

const photos = generatePhotos();
renderThumbnails(photos);
setPicturesListener(photos);

