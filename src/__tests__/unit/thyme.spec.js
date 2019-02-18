import {
  totalProjectTime,
  timeElapsed,
  roundTime,
  formatTime,
} from '../../core/thyme';

describe('Calculate total project time', () => {
  const times = [{
    project: null,
    start: '2018-01-03T10:00:00.000Z',
    end: '2018-01-03T12:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-01-03T10:00:00.000Z',
    end: '2018-01-03T12:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-01-04T10:00:00.000Z',
    end: '2018-01-04T15:00:00.000Z',
  }, {
    project: 'ABCDEF',
    start: '2018-02-03T10:00:00.000Z',
    end: '2018-02-03T12:00:00.000Z',
  }];

  it('Calculates the sum of durations for a project', () => {
    expect(totalProjectTime({ id: 'ABCDEF' }, times, new Date(2018, 0, 3), new Date(2018, 0, 4)))
      .toBe(7 * 60);
  });
});

describe('Returns correct time differences', () => {
  // with minute precision
  expect(timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:00:00.000Z', false, true))
    .toBe('2:00:00');
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', false, true))
    .toBe('2:00:00');

  // without minute precision
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', true, true))
    .toBe('1:59:50');

  // no seconds
  expect(timeElapsed('2018-01-03T10:00:10.000Z', '2018-01-03T12:00:00.000Z', true, false))
    .toBe('1:59');

  // use rounding of time
  expect(
    timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:33:00.000Z', false, false, 'round', 5),
  ).toBe('2:35');
  expect(
    timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:33:00.000Z', false, false, 'floor', 5),
  ).toBe('2:30');
  expect(
    timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:31:00.000Z', false, false, 'ceil', 5),
  ).toBe('2:35');
  expect(
    timeElapsed('2018-01-03T10:00:00.000Z', '2018-01-03T12:33:00.000Z', false, false),
  ).toBe('2:33');
});


describe('Rounding time', () => {
  it('Should be able to ignore rounding', () => {
    expect(formatTime(roundTime(0, 'none', new Date(2018, 0, 1, 10)))).toBe('10:00');
    expect(formatTime(roundTime(10, 'none', new Date(2018, 0, 1, 10, 2)))).toBe('10:02');
    expect(formatTime(roundTime(20, 'none', new Date(2018, 0, 1, 10, 6)))).toBe('10:06');
  });

  it('Should be able to round automatically', () => {
    expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 3)))).toBe('10:05');
    expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 2)))).toBe('10:00');
    expect(formatTime(roundTime(5, 'round', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');
    expect(
      formatTime(roundTime(45, 'round', new Date(2018, 0, 1, 11, 8), new Date(2018, 0, 1, 10, 0))),
    ).toBe('11:30');
    expect(
      formatTime(roundTime(45, 'round', new Date(2018, 0, 1, 10, 30), new Date(2018, 0, 1, 10, 0))),
    ).toBe('10:45');
  });

  it('Should be able to round up', () => {
    expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 3)))).toBe('10:05');
    expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 2)))).toBe('10:05');
    expect(formatTime(roundTime(5, 'ceil', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');
    expect(
      formatTime(roundTime(45, 'ceil', new Date(2018, 0, 1, 10, 46), new Date(2018, 0, 1, 10, 0))),
    ).toBe('11:30');
    expect(
      formatTime(roundTime(45, 'ceil', new Date(2018, 0, 1, 10, 1), new Date(2018, 0, 1, 10, 0))),
    ).toBe('10:45');
  });

  it('Should be able to round down', () => {
    expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 3)))).toBe('10:00');
    expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 2)))).toBe('10:00');
    expect(formatTime(roundTime(5, 'floor', new Date(2018, 0, 1, 10, 5)))).toBe('10:05');
    expect(
      formatTime(roundTime(45, 'floor', new Date(2018, 0, 1, 10, 46), new Date(2018, 0, 1, 10, 0))),
    ).toBe('10:45');
    expect(
      formatTime(roundTime(45, 'floor', new Date(2018, 0, 1, 11, 1), new Date(2018, 0, 1, 10, 0))),
    ).toBe('10:45');
  });
});
