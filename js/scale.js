const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleField = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const previewImage = document.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  scaleField.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const getScale = () => parseInt(scaleField.value, 10);

smallerButton.addEventListener('click', () => {
  applyScale(Math.max(getScale() - SCALE_STEP, SCALE_MIN));
});

biggerButton.addEventListener('click', () => {
  applyScale(Math.min(getScale() + SCALE_STEP, SCALE_MAX));
});

const resetScale = () => {
  applyScale(SCALE_DEFAULT);
};

export {resetScale};
