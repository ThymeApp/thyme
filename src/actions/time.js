export function addTime(entry) {
  return {
    type: 'ADD_TIME',
    ...entry,
  };
}

export function updateTime(entry) {
  return {
    type: 'UPDATE_TIME',
    ...entry,
  };
}
