import moment from 'moment';
import { DB_DATE_TIME_FORMAT } from 'config/enums';
import { BASE_URL } from 'config';

export const _keyExtractor = (item, index) => index.toString();
/* Generates a random guid */
export const guid = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

/* convert object to url params */
export const params = function (data) {
  return Object.keys(data)
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join('&');
};
export const createUrl = (pathname, search = {}, replace = false) =>
  `${pathname}?${params(search)}`;

/* Convert url params to object with key value pair */
export const getUrlParams = () => {
  const search = window.location.search;
  let hashes = search.slice(search.indexOf('?') + 1).split('&');
  let params = {};
  hashes.map((hash) => {
    let [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val);
  });

  return params;
};
/* It can be used to format a number with a specific number of digits to the right of the decimal. */
export const _toFixed = (amount, points = 2) => parseFloat(amount).toFixed(points);

/* suffles passed array */
export const shuffleArray = (arr) =>
  arr.sort(function (a, b) {
    return Math.random() - 0.5;
  });

export const isValidDate = (d) => d instanceof Date && !isNaN(d);

export const isArray = (a, retn = false) => {
  let res = !!a && a.constructor === Array;
  if (retn) return res ? a : [];
  return res;
};

export const arrayToUnique = (arrayPassed) =>
  arrayPassed.filter((v, i, a) => a.indexOf(v) === i && v !== '' && v !== undefined && v !== null);

export const isMobile = () => window.innerWidth < 767;

export const isoToFormatted = (
  a,
  toFormat = DB_DATE_TIME_FORMAT,
  fromFormat = DB_DATE_TIME_FORMAT,
  includeExtra = false,
) => {
  let date = fromFormat ? moment(a, fromFormat) : moment(a); // converting to utc

  let dNow = moment();
  if (includeExtra) {
    if (includeExtra == 'time')
      date.set({
        hour: dNow.get('hour'),
        minute: dNow.get('minute'),
        second: dNow.get('second'),
      });
    else
      date.set({
        year: dNow.get('year'),
        month: dNow.get('month'),
        date: dNow.get('date'),
      });
  }
  return date.local().format(toFormat);
};

export const dbTimeNow = (toFormat = DB_DATE_TIME_FORMAT) => moment().local().format(toFormat);

export const isIndianMobileNumber = (mobile) => {
  var IndNum = /^[6789]\d{9}$/;
  return IndNum.test(mobile);
};

export const imgSrc = (file, path) => {
  //return `https://www.ariselive.in:30006/${path}/${file || 'default.png'}`;
  return `${BASE_URL}/${path}/${file || 'default.png'}`;
};
