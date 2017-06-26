import { CHANGE_LOCALE } from '../actions/locales';

const LOCALES = {
  en: 'English',
  zh: '中文',
};

const initialState = {
  locales: LOCALES,
  locale: 'en',
};

export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: payload.locale,
      };
    default:
      return state;
  }
}
