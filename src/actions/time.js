// @flow

export function addTime(entry: timePropertyType) {
  return {
    type: 'ADD_TIME',
    ...entry,
  };
}

export function updateTime(entry: { id: string } & timePropertyType) {
  return {
    type: 'UPDATE_TIME',
    ...entry,
  };
}

export function removeTime(id: string) {
  return {
    type: 'REMOVE_TIME',
    id,
  };
}
