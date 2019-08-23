// @flow

import { getApiRoot } from 'sections/Settings/selectors';

let getState = () => undefined;

function createUrl(url: string) {
  const state = getState();

  if (!state) {
    throw new Error('Tried to get state before available');
  }

  const apiRoot = getApiRoot(state);

  return `${apiRoot}${url}`;
}

function jwt(): string | null {
  const state = getState();

  if (state && state.account && state.account.jwt) {
    return state.account.jwt;
  }

  return null;
}

export function setupStateResolver(stateResolver: () => any) {
  getState = stateResolver;
}

function request(method: 'POST' | 'GET' = 'GET', url: string, data?: any) {
  const token = jwt();

  const authorization = token ? {
    Authorization: `Bearer ${token}`,
  } : {};

  return fetch(
    createUrl(url),
    {
      method,
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...authorization,
        'content-type': 'application/json',
      },
      mode: 'cors',
    },
  )
    .then((response) => {
      if (!response.ok) {
        return response.json()
          .then((err) => {
            throw new Error(err.message);
          })
          .catch((err) => {
            // if json failed to parse
            if (err instanceof SyntaxError) {
              throw new Error(response.statusText);
            }

            throw err;
          });
      }

      return response.json();
    });
}

export function post(url: string, data: any) {
  return request('POST', url, data);
}

export function get(url: string) {
  return request('GET', url);
}

export function isValidThymeApi(url: string): Promise<boolean> {
  return fetch(url)
    .then((response) => response.headers.get('API-Consumer') === 'Thyme')
    .catch(() => false);
}
