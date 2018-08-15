import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { parse } from 'date-fns';

import createStore from '../../createStore';

import Time from '../../pages/Time';

describe('DateRange', () => {
  const store = createStore({
    time: {
      byId: {
        1: {
          id: 1,
          project: null,
          start: '2018-08-14T12:00:00.000Z',
          end: '2018-08-14T13:00:00.000Z',
        },
        2: {
          id: 2,
          project: null,
          start: '2018-08-14T15:00:00.000Z',
          end: '2018-08-14T16:00:00.000Z',
        },
        3: {
          id: 3,
          project: null,
          start: '2018-08-13T15:00:00.000Z',
          end: '2018-08-13T16:00:00.000Z',
        },
        4: {
          id: 4,
          project: null,
          start: '2018-08-09T15:00:00.000Z',
          end: '2018-08-09T16:00:00.000Z',
        },
        5: {
          id: 5,
          project: null,
          start: '2018-07-15T15:00:00.000Z',
          end: '2018-07-15T16:00:00.000Z',
        },
        6: {
          id: 6,
          project: null,
          start: '2017-07-15T15:00:00.000Z',
          end: '2017-07-15T16:00:00.000Z',
        },
      },
      allIds: [1, 2, 3, 4, 5, 6],
    },
  });
  const page = mount(
    <Provider store={store}>
      <Time now={parse('2018-08-14T19:00:00.000Z')} />
    </Provider>,
  );
  const dateRangeWrapper = page.find('DateRange');

  it('renders date ranges', () => {
    expect(dateRangeWrapper.find('.menu .item').length).toBe(5);
  });

  it('renders today\'s entries when picking today', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item')[0].simulate('click');

    expect(page.find('Entry').length).toBe(2);
  });

  it('renders today\'s entries when picking this week', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item')[1].simulate('click');

    expect(page.find('Entry').length).toBe(3);
  });

  it('renders today\'s entries when picking last 7 days', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item')[2].simulate('click');

    expect(page.find('Entry').length).toBe(4);
  });

  it('renders today\'s entries when picking last month', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item')[3].simulate('click');

    expect(page.find('Entry').length).toBe(5);
  });

  it('renders today\'s entries when picking older', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item')[4].simulate('click');

    expect(page.find('Entry').length).toBe(1);
  });
});
