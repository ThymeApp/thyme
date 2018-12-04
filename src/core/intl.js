// @flow

function getLocale() {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  }

  return navigator.language;
}

export function formatCurrency(currency: string, value: number) {
  return new Intl
    .NumberFormat(getLocale(), { style: 'currency', currency })
    .format(value);
}

export function formatShortDate(date: Date, numberOfDays: number) {
  if (numberOfDays > 14 && date.getDate() === 1) {
    return date.toLocaleDateString(getLocale(), { month: 'short' });
  }

  return date.toLocaleDateString(
    getLocale(),
    {
      month: numberOfDays < 15 ? '2-digit' : undefined,
      day: '2-digit',
      weekday: numberOfDays < 9 ? 'short' : undefined,
    },
  );
}
