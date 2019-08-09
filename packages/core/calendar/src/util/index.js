// @flow

import type { InjectedIntl } from 'react-intl';
import type { DateObj } from '../types';

type DateToStringOptions = {
  fixMonth: boolean,
};

const i18n = {
  'en-au': {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    weekdays: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
};

function getI18n() {
  return i18n['en-au'];
}

function pad(num) {
  return num < 10 ? `0${num}` : num;
}

export function getShortDayName(i: number) {
  return getI18n().weekdays[i].substring(0, 3);
}

export function getMonthName(i: number) {
  return getI18n().months[i - 1];
}

export function dateToString(
  date: DateObj,
  { fixMonth }: DateToStringOptions = {},
) {
  return `${date.year}-${pad(date.month + (fixMonth ? 1 : 0))}-${pad(
    date.day,
  )}`;
}

export function makeArrayFromNumber(i: number): Array<number> {
  const arr = [];
  for (let a = 0; a < i; a += 1) {
    arr.push(a);
  }
  return arr;
}

// formatDate
// formatTime
// getWeekdays
// getMonths

export function getI18nThingy(intl: InjectedIntl) {
  return {
    getDaysShort: () =>
      [1, 2, 3, 4, 5, 6, 7].map(day =>
        intl.formatDate(new Date(2019, 6, day), { weekday: 'short' }),
      ),
    getMonthsLong: () =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month =>
        intl.formatDate(new Date(2019, month, 1), { month: 'long' }),
      ),
  };
}
