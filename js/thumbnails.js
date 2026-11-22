const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({id, url, description, likes, comments}) => {
  const thumbnail = pictureTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.pictureId = id;

  return thumbnail;
};

const clearThumbnails = () => {
  picturesContainer.querySelectorAll('.picture').forEach((thumbnail) => {
    thumbnail.remove();
  });
};

const renderThumbnails = (pictures) => {
  clearThumbnails();
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(createThumbnail(picture));
  });

  picturesContainer.append(fragment);
};

export {renderThumbnails};
