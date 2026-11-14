const DEFAULT_EFFECT = 'none';

const Effects = {
  none: {min: 0, max: 100, step: 1},
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''},
};

const previewImage = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelField = effectLevelContainer.querySelector('.effect-level__value');
const slider = effectLevelContainer.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(slider, {
  range: {
    min: Effects.none.min,
    max: Effects.none.max,
  },
  start: Effects.none.max,
  step: Effects.none.step,
  connect: 'lower',
  format: {
    to: (value) => (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const applyEffectLevel = (level) => {
  if (currentEffect === DEFAULT_EFFECT) {
    previewImage.style.filter = '';
    effectLevelField.value = '';
    return;
  }

  const {filter, unit} = Effects[currentEffect];
  previewImage.style.filter = `${filter}(${level}${unit})`;
  effectLevelField.value = level;
};

slider.noUiSlider.on('update', () => {
  applyEffectLevel(slider.noUiSlider.get());
});

const setEffect = (effect) => {
  currentEffect = effect;
  const {min, max, step} = Effects[effect];

  effectLevelContainer.classList.toggle('hidden', effect === DEFAULT_EFFECT);
  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });
};

effectsList.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    setEffect(evt.target.value);
  }
});

const resetEffect = () => {
  setEffect(DEFAULT_EFFECT);
};

export {resetEffect};
