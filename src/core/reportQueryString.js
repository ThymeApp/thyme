// @flow

import qs from 'qs';
import type { RouterHistory } from 'react-router';

import endOfWeek from 'date-fns/end_of_week';
import startOfWeek from 'date-fns/start_of_week';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

function currentQueryString() {
  return qs.parse(window.location.search, { ignoreQueryPrefix: true, strictNullHandling: true });
}

export function queryStringFilters(): Array<string | null> | typeof undefined {
  const filters = currentQueryString().filter;

  if (filters) {
    return !Array.isArray(filters) ? [filters] : filters;
  }

  return filters;
}

export function queryStringFrom(): Date {
  const { from } = currentQueryString();

  if (!from) {
    return startOfWeek(new Date(), { weekStartsOn: 1 });
  }

  return parse(from);
}

export function queryStringTo(): Date {
  const { to } = currentQueryString();

  if (!to) {
    return endOfWeek(new Date(), { weekStartsOn: 1 });
  }

  return parse(to);
}

export function updateReport(
  filter: Array<string | null>,
  from: Date | string = queryStringFrom(),
  to: Date | string = queryStringTo(),
  history: RouterHistory,
) {
  const queryString = qs.stringify({
    filter,
    from: format(from),
    to: format(to),
  }, {
    strictNullHandling: true,
  });

  history.push(`/reports?${queryString}`);
}
