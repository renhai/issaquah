export const CHANGE_LOCALE = 'locale/CHANGE_LOCALE';

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: {
      locale,
    },
  };
}
