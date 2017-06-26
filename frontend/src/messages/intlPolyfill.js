/**
 * @see https://github.com/andyearnshaw/Intl.js
 */
import intlLocalesSupported from 'intl-locales-supported';
import { addLocaleData } from 'react-intl';
import messages from './index';

const supportLocales = Object.keys(messages);

supportLocales.forEach(locale =>
  addLocaleData(require(`react-intl/locale-data/${locale}`))
);

if (global.Intl) {
  if (!intlLocalesSupported(supportLocales)) {
    require('intl');
    Intl.NumberFormat = global.IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = global.IntlPolyfill.DateTimeFormat;
  }
} else {
  global.Intl = require('intl');
}
