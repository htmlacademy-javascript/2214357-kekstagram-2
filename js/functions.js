// Функция для проверки длины строки.

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength();

// Функция для проверки, является ли строка палиндромом.

const isPalindrom = (string) => {
  const optimizedString = string.replaceAll(' ', '').toLowerCase();
  let newString = '';

  for (let i = optimizedString.length - 1; i >= 0; i--) {
    newString += optimizedString[i];
  }

  return newString === optimizedString;
};

isPalindrom();


const getNumber = (string) => {
  const numberString = string.toString().replace(/\D/g, '');

  return parseInt(numberString, 10);
};

getNumber();

