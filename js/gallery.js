import {renderThumbnails} from './thumbnails.js';
import {openBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

let currentPictures = [];

const onPicturesContainerClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = currentPictures.find((item) => item.id === Number(thumbnail.dataset.pictureId));

  if (picture) {
    openBigPicture(picture);
  }
};

const initGallery = (pictures) => {
  currentPictures = pictures;
  renderThumbnails(pictures);
  picturesContainer.addEventListener('click', onPicturesContainerClick);
};

const updateGallery = (pictures) => {
  renderThumbnails(pictures);
};

export {initGallery, updateGallery};
