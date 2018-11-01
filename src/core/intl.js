// @flow

export function formatCurrency(currency: string, value: number) {
  return new Intl
    .NumberFormat(navigator.language, { style: 'currency', currency })
    .format(value);
}
