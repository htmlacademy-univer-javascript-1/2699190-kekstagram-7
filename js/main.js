import {getData} from './api.js';
import {initGallery} from './gallery.js';
import {showDataError} from './messages.js';
import './form.js';

getData()
  .then((pictures) => {
    initGallery(pictures);
  })
  .catch(() => {
    showDataError();
  });
