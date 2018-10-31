// @flow

export function updateCurrency(currency: string) {
  return {
    type: 'UPDATE_PROJECT_RATES_CURRENCY',
    currency,
  };
}
