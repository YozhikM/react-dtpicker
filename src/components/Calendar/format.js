import { format } from 'date-fns';

const locale = require('date-fns/locale/en');
// const locale = require('date-fns/locale/ru');

export default function(date, formatStr) {
  return format(date, formatStr, { locale });
};
