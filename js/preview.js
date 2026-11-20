const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const isImageFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const showPreview = (file) => {
  if (!file || !isImageFile(file)) {
    return false;
  }

  const imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });

  return true;
};

export {showPreview};
