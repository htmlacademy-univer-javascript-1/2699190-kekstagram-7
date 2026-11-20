import {getRandomInteger, debounce} from './util.js';

const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersBlock = document.querySelector('.img-filters');
const filtersForm = filtersBlock.querySelector('.img-filters__form');

const getRandomPictures = (pictures) => {
  const shuffledPictures = pictures.slice();

  for (let i = shuffledPictures.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [shuffledPictures[i], shuffledPictures[j]] = [shuffledPictures[j], shuffledPictures[i]];
  }

  return shuffledPictures.slice(0, RANDOM_PICTURES_COUNT);
};

const compareByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = (pictures, filter) => {
  switch (filter) {
    case Filter.RANDOM:
      return getRandomPictures(pictures);
    case Filter.DISCUSSED:
      return pictures.slice().sort(compareByComments);
    default:
      return pictures;
  }
};

const setActiveButton = (button) => {
  filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const initFilters = (pictures, onFilterChange) => {
  const applyFilter = debounce((filter) => {
    onFilterChange(getFilteredPictures(pictures, filter));
  }, RERENDER_DELAY);

  filtersBlock.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');

    if (!button) {
      return;
    }

    setActiveButton(button);
    applyFilter(button.id);
  });
};

export {initFilters};
