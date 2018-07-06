// @flow
import queryString from 'query-string';

import endOfWeek from 'date-fns/end_of_week';
import startOfWeek from 'date-fns/start_of_week';
import parse from 'date-fns/parse';

function currentQueryString() {
  return queryString.parse(window.location.search);
}

export function queryStringFilters() {
  return currentQueryString().filter;
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
