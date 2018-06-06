// @flow

export default function parseJwt(token: string, position: number = 1) {
  return JSON.parse(atob(token.split('.')[position]));
}
