import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffect} from './effects.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ErrorText = {
  INVALID_HASHTAG: 'Хэш-тег начинается с #, состоит из букв и цифр и не длиннее 20 символов',
  HASHTAGS_COUNT: `Можно указать не больше ${MAX_HASHTAGS} хэш-тегов`,
  HASHTAGS_REPEAT: 'Хэш-теги не должны повторяться',
  COMMENT_LENGTH: `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`,
};

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

const isHashtagsValid = (value) => getHashtags(value).every((hashtag) => HASHTAG_PATTERN.test(hashtag));

const isHashtagsCountValid = (value) => getHashtags(value).length <= MAX_HASHTAGS;

const isHashtagsUnique = (value) => {
  const hashtags = getHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagsField, isHashtagsValid, ErrorText.INVALID_HASHTAG, 3, true);
pristine.addValidator(hashtagsField, isHashtagsCountValid, ErrorText.HASHTAGS_COUNT, 2, true);
pristine.addValidator(hashtagsField, isHashtagsUnique, ErrorText.HASHTAGS_REPEAT, 1, true);
pristine.addValidator(commentField, isCommentValid, ErrorText.COMMENT_LENGTH);

const isTextFieldFocused = () => document.activeElement === hashtagsField || document.activeElement === commentField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const resetUploadForm = () => {
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
};

const openUploadForm = () => {
  resetScale();
  resetEffect();
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadForm() {
  resetUploadForm();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

fileInput.addEventListener('change', () => {
  openUploadForm();
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
