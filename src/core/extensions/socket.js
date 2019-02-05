// @flow

import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import { isLoggedIn, hasPremium } from 'sections/Account/selectors';

import { onChangeTimer, onChangeState } from './events';

function canSync(state: StateShape): boolean {
  return state && isLoggedIn(state) && hasPremium(state);
}

function jwt(state: StateShape): string | null {
  if (state && state.account && state.account.jwt) {
    return state.account.jwt;
  }

  return null;
}

function startSocketConnection(socket: Socket) {
  let state: StateShape;

  onChangeState((newState) => { state = newState; });

  onChangeTimer((item) => {
    if (canSync(state)) {
      const token = jwt(state);
      socket.emit('changeItem', {
        token,
        item,
      });
    }
  });

  socket.on('connect', () => console.log('connected'));
  socket.on('disconnect', () => console.log('disconnected'));
}

startSocketConnection(io(process.env.REACT_APP_API_ROOT));
