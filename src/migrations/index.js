// @flow

export function convertStartAndEndToTimestamps(input: any) {
  if (!input || !input.time) {
    return input;
  }

  return {
    ...input,
    time: {
      ...input.time,
      byId: Object.keys(input.time.byId).reduce((acc, key) => {
        const prev = input.time.byId[key];

        const isOldTime = /^\d{2}:\d{2}$/;
        if (
          !prev.date
          || !prev.start
          || !prev.end
          || !prev.start.toString().match(isOldTime)
          || !prev.end.toString().match(isOldTime)
        ) {
          // no need to convert
          return {
            ...acc,
            [key]: prev,
          };
        }

        const [fromHour, fromMinute] = prev.start.split(':');
        const [toHour, toMinute] = prev.end.split(':');
        const [year, month, day] = prev.date.split('-');

        const migrated = {
          ...prev,
          start: new Date(year, month - 1, day, parseInt(fromHour, 10), parseInt(fromMinute, 10)),
          end: new Date(year, month - 1, day, parseInt(toHour, 10), parseInt(toMinute, 10)),
        };

        delete migrated.date;

        return {
          ...acc,
          [key]: migrated,
        };
      }, {}),
    },
  };
}

export function convertRoundingSettingsToSubObject(input: any) {
  if (!input || !input.settings) {
    return input;
  }

  function getField(obj: any, field): any {
    if (!obj.settings.Rounding) {
      return obj.settings[field];
    }

    return obj.settings[field] || obj.settings.Rounding[field];
  }

  const inputCopy = { ...input };

  inputCopy.settings.Rounding = {
    durationRounding: getField(inputCopy, 'durationRounding'),
    durationRoundingAmount: getField(inputCopy, 'durationRoundingAmount'),
    RoundingOn: getField(inputCopy, 'RoundingOn'),
  };

  delete inputCopy.settings.durationRounding;
  delete inputCopy.settings.durationRoundingAmount;
  delete inputCopy.settings.RoundingOn;

  return inputCopy;
}

export default function migrateStoreData(input: any) {
  // migrate old data structures to new one
  return [
    convertStartAndEndToTimestamps,
    convertRoundingSettingsToSubObject,
  ].reduce((acc, f: (input: any) => any) => f(acc), input);
}
