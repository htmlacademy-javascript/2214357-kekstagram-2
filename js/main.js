import { getData } from './load-data';
import { generateErrorMesaage } from './error-message';
import { renderThumbnails } from './render-thumbnails';
import { setPicturesListener } from './big-picture';
import { initUploadModal } from './form/image-form';

const bootstrap = async () => {
  try {
    const photos = await getData();
    renderThumbnails(photos);
    setPicturesListener(photos);
  }catch(error) {
    generateErrorMesaage();
  }
};
// НЕ ПОНЯЛ КАК РЕАЛИЗОВАТЬ С ПОМОЩЮ ЦЕПОЧЕК .then(), не запустилось?

bootstrap();
initUploadModal();


