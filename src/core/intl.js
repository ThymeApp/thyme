// @flow

import parse from 'date-fns/parse';

// determine locale to use
const navigatorLocales = Array.isArray(navigator.languages) ? navigator.languages : [];
const locales = ['i-default', ...navigatorLocales];
const locale = locales.find((l) => {
  try {
    Intl.NumberFormat(l);
    return true;
  } catch (e) {
    // silent
  }
  return false;
});

export function formatCurrency(currency: string, value: number) {
  return new Intl
    .NumberFormat(locale, { style: 'currency', currency })
    .format(value);
}

type Weekday = 'narrow' | 'short' | 'long';

export function formatShortDate(
  date: Date | string,
  numberOfDays: number,
  weekday: Weekday = 'short',
) {
  const parsedDate = parse(date);

  if (numberOfDays > 14 && parsedDate.getDate() === 1) {
    return parsedDate.toLocaleDateString(locale, { month: 'short' });
  }

  return parsedDate.toLocaleDateString(
    locale,
    {
      month: numberOfDays < 15 ? '2-digit' : undefined,
      day: '2-digit',
      weekday: numberOfDays < 9 ? weekday : undefined,
    },
  );
}

export function formatDate(date: Date | number) {
  const parsedDate = parse(date);

  return parsedDate.toLocaleDateString(locale);
}

export function formatTime(date: Date | number) {
  const parsedDate = parse(date);

  return parsedDate.toLocaleTimeString(
    locale,
    { hour: '2-digit', minute: '2-digit' },
  );
}
