import { combineReducers } from 'redux';

function name(state = null, action) {
  switch (action.type) {
    case 'SET_SETTINGS':
      return action.name;
    case 'UPDATE_SETTING':
      return action.name;
    default:
      return state;
  }
}

function value(state = '', action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return action.value;
    case 'SET_SETTINGS':
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
