const PHOTOS_COUNT = 25;
const AVATARS_COUNT = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MAX = 30;

const DESCRIPTIONS = [
  'Закат на набережной',
  'Утренний кофе перед парами',
  'Мой кот опять занял ноутбук',
  'Прогулка по осеннему парку',
  'Вид из окна общежития',
  'Первый снег в этом году',
  'Ужин с друзьями',
  'Старый трамвай на конечной',
  'Горы, в которые хочется вернуться',
  'Просто красивое небо',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Алина', 'Сергей', 'Ксения'];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};

const generateCommentId = createIdGenerator();

const createMessage = () => {
  const shuffledMessages = [...MESSAGES].sort(() => Math.random() - 0.5);
  return shuffledMessages.slice(0, getRandomInteger(1, 2)).join(' ');
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
  comments: Array.from({length: getRandomInteger(0, COMMENTS_MAX)}, createComment),
});

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, index) => createPhoto(index + 1));

createPhotos();
