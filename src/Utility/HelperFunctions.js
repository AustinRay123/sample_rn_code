import _ from 'lodash';
import moment from 'moment';

export const chooseAppThemeBasedOnCurrentTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Convert hours and minutes to 2-digit format
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
  let period;

  if (hours >= 0 && hours < 12) {
    period = 'AM'; // First 12 hours (AM)
  } else {
    period = 'PM'; // Last 12 hours (PM)
  }
  let twelveHourFormatHours = hours % 12;
  if (twelveHourFormatHours === 0) {
    twelveHourFormatHours = 12;
  }

  const twelveHourFormatTime = `${twelveHourFormatHours
    .toString()
    .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  return period;
};

export const isEmail = (email = '') => {
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );
  if (pattern.test(email.trim())) {
    return true;
  }
  return false;
};

export const isValidPassword = password => {
  var pattern = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
  );
  if (pattern.test(password)) {
    return true;
  }
  return false;
};

export const isValidPassword8cahrOnly = password => {
  var pattern = new RegExp(/^.{8,}$/i);
  if (pattern.test(password)) {
    return true;
  }
  return false;
};

export const isValidConfirmPassword = (password = '', confirmPass = '') => {
  if (_.isEqual(password, confirmPass)) {
    return true;
  }

  return false;
};

export function calculatePercentage(hours, totalHours) {
  if (hours < 0 || hours > 24) {
    throw new Error('Hours must be between 0 and 24');
  }

  // const totalHours = 24;
  const percentage = (hours / totalHours) * 100;

  return percentage;
}

export const getCurrentTime = () => {
  const now = new Date();
  return moment(now).format('H');
};

export function checkIsDaytime(currentTime) {
  return currentTime >= 6 && currentTime < 18;
}

export function calculateEndTime(startDateTime, totalHours) {
  const startDate = new Date(startDateTime);

  const startHour = startDate.getUTCHours();
  const startMinute = startDate.getUTCMinutes();

  const totalMinutes = startHour * 60 + startMinute + totalHours * 60;

  const endHour = Math.floor(totalMinutes / 60);
  const endMinute = totalMinutes % 60;

  const formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
  const formattedEndMinute = endMinute < 10 ? `0${endMinute}` : `${endMinute}`;

  return `${formattedEndHour}:${formattedEndMinute}`;
}
