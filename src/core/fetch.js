// @flow

const apiRoot = process.env.REACT_APP_API_ROOT || '//localhost:4000';
let getState = () => undefined;

function createUrl(url: string) {
  return `${apiRoot}${url}`;
}

function jwt(): string | null {
  const state = getState();

  if (state && state.account && state.account.jwt) {
    return state.account.jwt;
  }

  return null;
}

export function setupStore(stateResolver: () => any) {
  getState = stateResolver;
}

export function post(url: string, data: any) {
  const token = jwt();

  const authorization = token ? {
    Authorization: `Bearer ${token}`,
  } : {};

  return fetch(
    createUrl(url),
    {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...authorization,
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    },
  )
    .then((response) => {
      if (!response.ok) {
        return response.json()
          .then((err) => {
            throw new Error(err.message);
          })
          .catch(() => {
            throw new Error(response.statusText);
          });
      }

      return response.json();
    });
}
