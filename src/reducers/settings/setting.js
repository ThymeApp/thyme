import { combineReducers } from 'redux';

function name(state = '', action) {
  switch (action.type) {
    case 'ADD_SETTING':
      return action.name;
    case 'UPDATE_SETTING':
      return action.name;
    default:
      return state;
  }
}

function value(state = '', action) {
  switch (action.type) {
    case 'ADD_SETTING':
      return action.value;
    case 'UPDATE_SETTING':
      return action.value;
    default:
      return state;
  }
}


const setting = combineReducers({
  name,
  value,
});

export default setting;
