const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
};

const extractNumber = (value) => {
  const string = value.toString();
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      digits += string[i];
    }
  }

  return parseInt(digits, 10);
};

checkStringLength('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
extractNumber('1 кефир, 0.5 батона');
