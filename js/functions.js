// Функция для проверки длины строки.

// const checkStringLength = (string, maxLength) => string.length <= maxLength;

// checkStringLength();

// Функция для проверки, является ли строка палиндромом.

// const isPalindrom = (string) => {
//   const optimizedString = string.replaceAll(' ', '').toLowerCase();
//   let newString = '';

//   for (let i = optimizedString.length - 1; i >= 0; i--) {
//     newString += optimizedString[i];
//   }

//   return newString === optimizedString;
// };

// isPalindrom();


// const getNumber = (string) => {
//   const numberString = string.toString().replace(/\D/g, '');

//   return parseInt(numberString, 10);
// };

// getNumber();


// Функция из Доп.задания пятого раздела ДЗ.

const timeWorking = (timeStart, timeStop, timeMeet, duration) => {
  let start = timeStart.split(':');
  start = (parseInt(start[0], 10) * 60) + parseInt(start[1], 10);

  let end = timeStop.split(':');
  end = (parseInt(end[0], 10) * 60) + parseInt(end[1], 10);

  let meet = timeMeet.split(':');
  meet = (parseInt(meet[0], 10) * 60) + parseInt(meet[1], 10);

  return !!(start <= meet + duration && meet + duration <= end);

};
console.log(timeWorking('8:00', '17:30', '14:00', 212));

// Алексей подскажи как тут лучше всего сделать рефакторинг?
