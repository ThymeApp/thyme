import { combineReducers } from 'redux';

function rounding(state = 0, action) {
  switch (action.type) {
    case 'ROUNDING':
      return action.value;
    default:
      return state;
  }
}
function roundingDown(state = 0, action) {
  switch (action.type) {
    case 'ROUNDING_DOWN':
      return action.value;
    default:
      return state;
  }
}
const setting = combineReducers({
  rounding,
  roundingDown,
});

export default setting;
