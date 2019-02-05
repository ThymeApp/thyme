// @flow

import io from 'socket.io-client';

import { isLoggedIn, hasPremium } from 'sections/Account/selectors';

import { onChangeTimer, onChangeState } from './events';

const socket = io(process.env.REACT_APP_API_ROOT);

function canSync(state: StateShape): boolean {
  return state && isLoggedIn(state) && hasPremium(state);
}

function startSocketConnection(socket) {
  let state: StateShape;

  onChangeState((newState) => { state = newState; });

  onChangeTimer((item) => {
    if (canSync(state)) {
      console.log('changed a timer', item);
    }
  });

  socket.on('connect', () => console.log('connected'));
  socket.on('disconnect', () => console.log('disconnected'));
}

startSocketConnection(socket);
