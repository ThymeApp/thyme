// @flow

import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

import { hasPremium } from 'sections/Account/selectors';

import { onChangeTimer, onChangeState, receiveTimer } from './events';

function canSync(state: StateShape): boolean {
  return state && hasPremium(state);
}

function jwt(state: StateShape): string | null {
  if (state && state.account && state.account.jwt) {
    return state.account.jwt;
  }

  return null;
}

function startSocketConnection(socket: Socket) {
  let communicatedConnection = false;
  let state: StateShape;

  onChangeState((newState) => {
    state = newState;

    if (!communicatedConnection && canSync(state)) {
      communicatedConnection = true;

      const token = jwt(state);

      socket.emit('connectUser', { token });
    }
  });

  onChangeTimer((item) => {
    if (canSync(state)) {
      socket.emit('changeItem', { item });
    }
  });

  socket.on('changeItem', (data) => {
    if (data.socket !== socket.id) {
      receiveTimer(data.item, false);
    }
  });
}

if (process.env.REACT_APP_API_ROOT) {
  startSocketConnection(io(process.env.REACT_APP_API_ROOT));
}
