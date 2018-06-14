// @flow

export default function parseJwt(token: string, position: number = 1) {
  try {
    return JSON.parse(atob(token.split('.')[position]));
  } catch (e) {
    return {};
  }
}
