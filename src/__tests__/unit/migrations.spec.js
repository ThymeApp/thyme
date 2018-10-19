import {
  convertStartAndEndToTimestamps,
  convertRoundingSettingsToSubObject,
} from '../../migrations';

describe('convertStartAndEndToTimestamps', () => {
  it('Converts to correct time stamp fields', () => {
    const state = {
      dontTouchMe: 'hey',
      time: {
        byId: {
          B1C2f2z_G: {
            id: 'B1C2f2z_G',
            date: '2018-01-01',
            start: '07:30',
            end: '12:15',
          },
          B1GrdNEDG: {
            id: 'B1GrdNEDG',
            date: '2018-01-02',
            start: '14:30',
            end: '15:35',
          },
        },
      },
    };

    const outcome = convertStartAndEndToTimestamps(state);

    expect(outcome).toEqual({
      dontTouchMe: 'hey',
      time: {
        byId: {
          B1C2f2z_G: {
            id: 'B1C2f2z_G',
            start: new Date(2018, 0, 1, 7, 30),
            end: new Date(2018, 0, 1, 12, 15),
          },
          B1GrdNEDG: {
            id: 'B1GrdNEDG',
            start: new Date(2018, 0, 2, 14, 30),
            end: new Date(2018, 0, 2, 15, 35),
          },
        },
      },
    });
  });

  it('Ignores already converted fields', () => {
    const state = {
      time: {
        byId: {
          B1C2f2z_G: {
            id: 'B1C2f2z_G',
            start: new Date(2018, 0, 1, 7, 30),
            end: new Date(2018, 0, 1, 12, 15),
          },
          B1GrdNEDG: {
            id: 'B1GrdNEDG',
            start: new Date(2018, 0, 2, 14, 30),
            end: new Date(2018, 0, 2, 15, 35),
          },
        },
      },
    };

    const outcome = convertStartAndEndToTimestamps(state);

    expect(outcome).toEqual({
      time: {
        byId: {
          B1C2f2z_G: {
            id: 'B1C2f2z_G',
            start: new Date(2018, 0, 1, 7, 30),
            end: new Date(2018, 0, 1, 12, 15),
          },
          B1GrdNEDG: {
            id: 'B1GrdNEDG',
            start: new Date(2018, 0, 2, 14, 30),
            end: new Date(2018, 0, 2, 15, 35),
          },
        },
      },
    });
  });

  it('Ignores conversion when time property is missing', () => {
    const state = {
      noTime: true,
    };

    const outcome = convertStartAndEndToTimestamps(state);

    expect(outcome).toEqual({
      noTime: true,
    });
  });
});


describe('convertRoundingSettingsToSubObject', () => {
  it('Converts root properties to sub object', () => {
    const input = {
      settings: {
        durationRounding: 'round',
        durationRoundingAmount: 15,
        roundingOn: 'entries',
      },
    };

    const output = {
      settings: {
        rounding: {
          durationRounding: 'round',
          durationRoundingAmount: 15,
          roundingOn: 'entries',
        },
      },
    };

    expect(convertRoundingSettingsToSubObject(input)).toEqual(output);
  });

  it('Overwrite properties already defined', () => {
    const input = {
      settings: {
        durationRounding: 'round',
        durationRoundingAmount: 15,
        roundingOn: 'entries',
        rounding: {
          durationRounding: 'ceil',
        },
      },
    };

    const output = {
      settings: {
        rounding: {
          durationRounding: 'round',
          durationRoundingAmount: 15,
          roundingOn: 'entries',
        },
      },
    };

    expect(convertRoundingSettingsToSubObject(input)).toEqual(output);
  });
});
