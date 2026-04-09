import { getRandomInteger, getRandomArrayElement } from './util.js';

const NAMES = [
  'Владимир',
  'Генадий',
  'Олег',
  'Виталий',
  'Максим',
  'Наталья',
  'Светлана',
  'Ольга',
  'Ева'
];

const DESCRIPTIONS = [
  'Замечательное фото',
  'Отличный ракурс',
  'Классная идея',
  'Красивое фото',
  'Это фото заслуживае отдельного внимания',
  'Можно сразу на обложку журнала',
  'У тебя определённо талант!!!'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают., Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 25;

const createIdGenirator = () => {
  let currentId = 0;

  return () => ++currentId;
};

const generatePhotoId = createIdGenirator();
const generateCommentsId = createIdGenirator();


const createComentsPhoto = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => ({
  id: generatePhotoId(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  comments: Array.from({ length: getRandomInteger(0, 30) }, createComentsPhoto),
  likes: getRandomInteger(15, 200)});

const generatePhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);


export { generatePhotos };
