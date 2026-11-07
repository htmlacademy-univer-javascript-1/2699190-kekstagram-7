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

const getMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const isMeetingInWorkday = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const meetingStartMinutes = getMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= getMinutes(dayStart) && meetingEndMinutes <= getMinutes(dayEnd);
};

checkStringLength('проверяемая строка', 20);
isPalindrome('Лёша на полке клопа нашёл ');
extractNumber('1 кефир, 0.5 батона');
isMeetingInWorkday('08:00', '17:30', '14:00', 90);
