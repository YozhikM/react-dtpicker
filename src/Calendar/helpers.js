/* @flow */

export type Highlight = {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
};

export function convertToUTCNewDate(date?: Date): Date {
  let newDate;
  if (date) newDate = date;
  else {
    newDate = new Date();
  }
  const YY = newDate.getFullYear();
  const MM = newDate.getMonth();
  const DD = newDate.getDate();
  const hh = newDate.getHours();
  const mm = newDate.getMinutes();
  const ss = newDate.getSeconds();

  return new Date(Date.UTC(YY, MM, DD, hh, mm, ss));
}

export function getValueFromDate(date?: Date): Highlight {
  if (!date) {
    const dateNow = new Date();
    return {
      year: dateNow.getUTCFullYear(),
      month: dateNow.getUTCMonth(),
      day: dateNow.getUTCDate(),
      hour: dateNow.getUTCHours(),
      minute: dateNow.getUTCMinutes(),
      second: dateNow.getUTCSeconds(),
    };
  }

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth(),
    day: date.getUTCDate() || 1,
    hour: date.getUTCHours() || 0,
    minute: date.getUTCMinutes() || 0,
    second: date.getUTCSeconds() || 0,
  };
}

export function getDateFromValue({ year, month, day, hour, minute, second }: Highlight): Date {
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}
