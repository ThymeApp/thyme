import { valueFromEventTarget } from '../../core/dom';

describe('value from event target', () => {
  it('Gets the value from the event target or returns empty string', () => {
    const input = document.createElement('input');
    input.setAttribute('value', 'test');

    expect(valueFromEventTarget(input)).toBe('test');

    const fakeInput = document.createElement('div');

    expect(valueFromEventTarget(fakeInput)).toBe('');
  });
});
