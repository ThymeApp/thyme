

import { totalProjectTime } from '../core/thyme';

describe('Calculate total project time', () => {
  const times = [{
    project: null,
    date: '2018-01-03',
    start: '10:00',
    end: '12:00',
  }, {
    project: 'ABCDEF',
    date: '2018-01-03',
    start: '10:00',
    end: '12:00',
  }, {
    project: 'ABCDEF',
    date: '2018-01-04',
    start: '10:00',
    end: '15:00',
  }, {
    project: 'ABCDEF',
    date: '2018-02-03',
    start: '10:00',
    end: '12:00',
  }];

  it('Calculates the sum of durations for a project', () => {
    expect(totalProjectTime({ id: 'ABCDEF' }, times, new Date(2018, 0, 3), new Date(2018, 0, 4)))
      .toBe(7 * 60);
  });
});
