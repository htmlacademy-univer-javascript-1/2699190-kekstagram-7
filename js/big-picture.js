import {isEscapeKey} from './util.js';

const COMMENTS_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let shownComments = 0;

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  const avatarImage = comment.querySelector('.social__picture');

  avatarImage.src = avatar;
  avatarImage.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownComments, shownComments + COMMENTS_PORTION);
  const fragment = document.createDocumentFragment();

  nextComments.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  commentsList.append(fragment);
  shownComments += nextComments.length;
  shownCommentsCount.textContent = shownComments;
  commentsLoader.classList.toggle('hidden', shownComments >= currentComments.length);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openBigPicture = ({url, likes, comments, description}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  caption.textContent = description;

  currentComments = comments;
  shownComments = 0;
  commentsList.replaceChildren();
  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

commentsLoader.addEventListener('click', () => {
  renderNextComments();
});

export {openBigPicture};
