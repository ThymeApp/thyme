// @flow
import { combineReducers } from 'redux';

function startTimeRounding(state = { rounding: 5, roundingDirection: 'down' }, action) {
  switch (action.type) {
    case 'START_TIME':
      return { rounding: action.rounding, roundingDirection: action.roundingDirection };
    default:
      return state;
  }
}

function endTimeRounding(state = { rounding: 5, roundingDirection: 'up' }, action) {
  switch (action.type) {
    case 'END_TIME':
      return { rounding: action.rounding, roundingDirection: action.roundingDirection };
    default:
      return state;
  }
}
const setting = combineReducers({
  startTimeRounding,
  endTimeRounding,
});

export default setting;
