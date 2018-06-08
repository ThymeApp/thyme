import { mergeImport } from '../core/importExport';

describe('Merging data', () => {
  it('Overwrites current time values with new data', () => {
    const currentData = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-06-08T12:15:00.000Z',
          end: '2018-06-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'hijklmn',
          start: '2018-06-09T12:15:00.000Z',
          end: '2018-06-09T14:15:00.000Z',
          notes: 'Testing Thyme twice',
        },
      ],
    };

    const newData = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-07-08T12:15:00.000Z',
          end: '2018-07-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'opqrstu',
          start: '2018-09-08T12:15:00.000Z',
          end: '2018-09-08T14:15:00.000Z',
          notes: 'Testing New Thyme',
        },
      ],
    };

    const output = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-07-08T12:15:00.000Z',
          end: '2018-07-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'hijklmn',
          start: '2018-06-09T12:15:00.000Z',
          end: '2018-06-09T14:15:00.000Z',
          notes: 'Testing Thyme twice',
        },
        {
          id: 'opqrstu',
          start: '2018-09-08T12:15:00.000Z',
          end: '2018-09-08T14:15:00.000Z',
          notes: 'Testing New Thyme',
        },
      ],
      projects: [],
      reports: [],
    };

    expect(mergeImport(currentData, newData)).toEqual(output);
  });

  it('Add new entries to current time values', () => {
    const currentData = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-06-08T12:15:00.000Z',
          end: '2018-06-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'hijklmn',
          start: '2018-06-09T12:15:00.000Z',
          end: '2018-06-09T14:15:00.000Z',
          notes: 'Testing Thyme twice',
        },
        {
          id: 'opqrstu',
          start: '2018-09-08T12:15:00.000Z',
          end: '2018-09-08T14:15:00.000Z',
          notes: 'Testing New Thyme',
        },
      ],
    };

    const newData = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-07-08T12:15:00.000Z',
          end: '2018-07-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'opqrstu',
          start: '2018-09-08T12:15:00.000Z',
          end: '2018-09-08T14:15:00.000Z',
          notes: 'Testing New Thyme',
        },
      ],
    };

    const output = {
      time: [
        {
          id: 'abcdefg',
          start: '2018-06-08T12:15:00.000Z',
          end: '2018-06-08T14:15:00.000Z',
          notes: 'Testing Thyme',
        },
        {
          id: 'hijklmn',
          start: '2018-06-09T12:15:00.000Z',
          end: '2018-06-09T14:15:00.000Z',
          notes: 'Testing Thyme twice',
        },
        {
          id: 'opqrstu',
          start: '2018-09-08T12:15:00.000Z',
          end: '2018-09-08T14:15:00.000Z',
          notes: 'Testing New Thyme',
        },
      ],
      projects: [],
      reports: [],
    };

    expect(mergeImport(currentData, newData, false)).toEqual(output);
  });

  it('Works for projects too', () => {
    const currentData = {
      projects: [
        {
          id: 'abcdefg',
          name: 'Thyme',
        },
        {
          id: 'hijklmn',
          name: 'Testing',
        },
      ],
    };

    const newData = {
      projects: [
        {
          id: 'abcdefg',
          name: 'Thymer',
        },
        {
          id: 'opqrstu',
          name: 'ThymeTester',
        },
      ],
    };

    const output = {
      time: [],
      projects: [
        {
          id: 'abcdefg',
          name: 'Thymer',
        },
        {
          id: 'hijklmn',
          name: 'Testing',
        },
        {
          id: 'opqrstu',
          name: 'ThymeTester',
        },
      ],
      reports: [],
    };

    expect(mergeImport(currentData, newData)).toEqual(output);
  });

  it('Works for reports too', () => {
    const currentData = {
      reports: [
        {
          id: 'abcdefg',
          name: 'Thyme',
        },
        {
          id: 'hijklmn',
          name: 'Testing',
        },
      ],
    };

    const newData = {
      reports: [
        {
          id: 'abcdefg',
          name: 'Thymer',
        },
        {
          id: 'opqrstu',
          name: 'ThymeTester',
        },
      ],
    };

    const output = {
      time: [],
      projects: [],
      reports: [
        {
          id: 'abcdefg',
          name: 'Thymer',
        },
        {
          id: 'hijklmn',
          name: 'Testing',
        },
        {
          id: 'opqrstu',
          name: 'ThymeTester',
        },
      ],
    };

    expect(mergeImport(currentData, newData)).toEqual(output);
  });

  it('Gets empty export object when nothing is present', () => {
    const currentData = {};

    const newData = {};

    const output = {
      time: [],
      projects: [],
      reports: [],
    };

    expect(mergeImport(currentData, newData)).toEqual(output);
  });
});
