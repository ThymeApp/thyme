import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { parse, isSameDay } from 'date-fns';

import TimeSheet from 'sections/TimeSheet/TimeSheet';

import createStore from '../../createStore';

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
      <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
    </Provider>,
  );
  const dateRangeWrapper = page.find('DateRange');

  it('renders date ranges', () => {
    // click on "today"
    dateRangeWrapper.find('.menu .item').at(0).simulate('click');

    expect(dateRangeWrapper.find('.menu .item').length).toBe(5);
  });

  it('renders today\'s entries when picking today', () => {
    expect(page.find('ListEntry').length).toBe(2);
  });

  it('renders this week\'s entries when picking this week', () => {
    // click on "this week"
    dateRangeWrapper.find('.menu .item').at(1).simulate('click');

    expect(page.find('ListEntry').length).toBe(3);
  });

  it('renders entries when picking last 7 days', () => {
    // click on "week to date"
    dateRangeWrapper.find('.menu .item').at(2).simulate('click');

    expect(page.find('ListEntry').length).toBe(4);
  });

  it('renders entries when picking last month', () => {
    // click on "last month"
    dateRangeWrapper.find('.menu .item').at(3).simulate('click');

    expect(page.find('ListEntry').length).toBe(5);
  });

  it('renders old entries when picking older', () => {
    // click on "older"
    dateRangeWrapper.find('.menu .item').at(4).simulate('click');

    expect(page.find('ListEntry').length).toBe(1);
  });
});

describe('EditableEntry', () => {
  it('Has the correct starting date', () => {
    const store = createStore();
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    expect(page.find('EditableEntry').find('DateInput').first().prop('value')).toBe('2018-08-14');
  });

  it('Adds and updates entry to the store', () => {
    const store = createStore();
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    const startTime = document.createElement('input');
    startTime.value = '09:00';

    const endTime = document.createElement('input');
    endTime.value = '12:00';

    const notes = document.createElement('input');
    notes.value = 'Testing Thyme';

    page.find('EditableEntry').find('input[type="time"]').at(0).simulate('change', { target: startTime });
    page.find('EditableEntry').find('input[type="time"]').at(0).simulate('blur');
    page.find('EditableEntry').find('input[type="time"]').at(1).simulate('change', { target: endTime });
    page.find('EditableEntry').find('input[type="time"]').at(1).simulate('blur');
    page.find('EditableEntry').find('.EditableEntry__Notes input').at(0).simulate('change', { target: notes });
    page.find('EditableEntry').find('.EditableEntry__Notes input').at(0).simulate('blur');

    page.find('EditableEntry')
      .find('.EditableEntry__Actions')
      .find('Button')
      .at(1)
      .simulate('click');

    const state = store.getState();
    const entries = state.time.allIds.map((id) => state.time.byId[id]);

    // see if entry has entered
    expect(entries.length).toBe(1);
    expect(entries[0].notes).toBe('Testing Thyme');
  });

  it('Adds entry to the store with a project selected', () => {
    const store = createStore({
      projects: {
        allIds: [1],
        byId: {
          1: {
            id: 1,
            name: 'Project name',
            parent: null,
          },
        },
      },
    });
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    const startTime = document.createElement('input');
    startTime.value = '09:00';

    const endTime = document.createElement('input');
    endTime.value = '12:00';

    // set times
    page.find('EditableEntry').find('input[type="time"]').at(0).simulate('change', { target: startTime });
    page.find('EditableEntry').find('input[type="time"]').at(1).simulate('change', { target: endTime });

    // select project
    page.find('EditableEntry').find('input.search').simulate('click');
    page.find('EditableEntry').find('.dropdown .item').at(1).simulate('click');

    // submit
    page.find('EditableEntry')
      .find('.EditableEntry__Actions')
      .find('Button')
      .at(1)
      .simulate('click');

    const state = store.getState();
    const entries = state.time.allIds.map((id) => state.time.byId[id]);

    expect(entries[0].project).toBe(1);
  });

  it('Creates project from project select', () => {
    const store = createStore();
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    const projectName = document.createElement('input');
    projectName.value = 'Test project';

    // select project
    page.find('EditableEntry').find('input.search').simulate('change', { target: projectName });
    page.find('EditableEntry').find('.dropdown .item').at(0).simulate('click');

    const state = store.getState();
    const projects = state.projects.allIds.map((id) => state.projects.byId[id]);

    expect(projects.length).toBe(1);
    expect(projects[0].name).toBe('Test project');
  });

  it('Updates both dates when a different date is picked', () => {
    const store = createStore({
      time: {
        byId: {},
        allIds: [],
      },
    });
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    const startDate = document.createElement('input');
    startDate.value = '2018-08-15';

    const startDateElement = page.find('EditableEntry').find('input[type="date"]').at(0);

    startDateElement.simulate('change', { target: startDate });
    startDateElement.simulate('blur');

    // submit
    page.find('EditableEntry')
      .find('.EditableEntry__Actions')
      .find('Button')
      .at(1)
      .simulate('click');

    const state = store.getState();
    const entries = state.time.allIds.map((id) => state.time.byId[id]);
    expect(isSameDay(entries[0].start, '2018-08-15T19:00:00.000Z')).toBe(true);
    expect(isSameDay(entries[0].end, '2018-08-15T19:00:00.000Z')).toBe(true);
  });

  it('Updates only start date if manual end date is enabled', () => {
    const store = createStore({
      time: {
        byId: {},
        allIds: [],
      },
      settings: {
        timesheet: {
          enableEndDate: true,
        },
      },
    });
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    const startDate = document.createElement('input');
    startDate.value = '2018-08-13';

    page.find('EditableEntry').find('input[type="date"]').at(0).simulate('change', { target: startDate });
    page.find('EditableEntry').find('input[type="date"]').at(0).simulate('blur');

    // submit
    page.find('EditableEntry')
      .find('.EditableEntry__Actions')
      .find('Button')
      .at(1)
      .simulate('click');

    const state = store.getState();
    const entries = state.time.allIds.map((id) => state.time.byId[id]);
    expect(isSameDay(entries[0].start, '2018-08-13T19:00:00.000Z')).toBe(true);
    expect(isSameDay(entries[0].end, '2018-08-14T19:00:00.000Z')).toBe(true);
  });
});

describe('ListEntry', () => {
  it('Renders duration when times changes', () => {
    const store = createStore();
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    // change start time at 01:00 and end time to 03:00
    const startTime = document.createElement('input');
    startTime.value = '01:00';

    const endTime = document.createElement('input');
    endTime.value = '03:00';

    page.find('EditableEntry').find('input[type="time"]').at(0).simulate('change', { target: startTime });
    page.find('EditableEntry').find('input[type="time"]').at(0).simulate('blur');
    page.find('EditableEntry').find('input[type="time"]').at(1).simulate('change', { target: endTime });
    page.find('TimeSheet').find('input[type="time"]').at(1).simulate('blur');

    page.find('EditableEntry')
      .find('.EditableEntry__Actions')
      .find('Button')
      .at(1)
      .simulate('click');

    expect(page.find('ListEntry').find('.ListEntry__Duration').at(0).text()).toBe('2:00');
  });

  it('Can update time entries', () => {
    const store = createStore({
      time: {
        byId: {
          1: {
            id: 1,
            project: null,
            start: '2018-08-14T12:00:00.000Z',
            end: '2018-08-14T13:00:00.000Z',
          },
        },
        allIds: [1],
      },
    });
    const page = mount(
      <Provider store={store}>
        <TimeSheet now={parse('2018-08-14T19:00:00.000Z')} />
      </Provider>,
    );

    // open edit modal
    page.find('ListEntry').at(0).simulate('click');

    // testing updates
    const notes = document.createElement('input');
    notes.value = 'Updated notes';

    const notesInput = page.find('Modal').find('.EditableEntry__Notes input').at(0);
    notesInput.simulate('change', { target: notes });
    notesInput.simulate('blur');

    // save the entry
    page.find('Modal').find('.actions .button').at(0).simulate('click');

    const updatedState = store.getState();
    const updatedEntries = updatedState.time.allIds.map((id) => updatedState.time.byId[id]);

    expect(updatedEntries[0].notes).toBe('Updated notes');
  });
});
