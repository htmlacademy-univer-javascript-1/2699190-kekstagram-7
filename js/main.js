import {getData} from './api.js';
import {initGallery, updateGallery} from './gallery.js';
import {initFilters} from './filters.js';
import {showDataError} from './messages.js';
import './form.js';

getData()
  .then((pictures) => {
    initGallery(pictures);
    initFilters(pictures, updateGallery);
  })
  .catch(() => {
    showDataError();
  });
