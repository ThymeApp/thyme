// @flow

import parse from 'date-fns/parse';

export function formatCurrency(currency: string, value: number) {
  return new Intl
    .NumberFormat('i-default', { style: 'currency', currency })
    .format(value);
}

export function formatShortDate(date: Date, numberOfDays: number) {
  const parsedDate = parse(date);

  if (numberOfDays > 14 && parsedDate.getDate() === 1) {
    return parsedDate.toLocaleDateString('i-default', { month: 'short' });
  }

  return parsedDate.toLocaleDateString(
    'i-default',
    {
      month: numberOfDays < 15 ? '2-digit' : undefined,
      day: '2-digit',
      weekday: numberOfDays < 9 ? 'short' : undefined,
    },
  );
}

export function formatTime(date: Date | number) {
  const parsedDate = parse(date);

  return parsedDate.toLocaleTimeString(
    'i-default',
    { hour: '2-digit', minute: '2-digit' },
  );
}
