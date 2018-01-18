// @flow

export function valueFromEventTarget(target: EventTarget): string {
  if (target instanceof HTMLInputElement) {
    return target.value;
  }

  return '';
}
