// @flow

import { useContext, useMemo } from 'react';
import { ReactReduxContext } from 'react-redux';

export function useMappedState<SP>(mapState: (state: StateShape) => SP): SP {
  const context = useContext(ReactReduxContext);
  return useMemo(
    () => mapState(context.store.getState()),
    [context.store.getState(), mapState],
  );
}

export function useDispatch<DP>(mapDispatch: (dispatch: ThymeDispatch) => DP): DP {
  const context = useContext(ReactReduxContext);

  return useMemo<DP>(
    () => mapDispatch(context.store.dispatch),
    [context.store.dispatch, mapDispatch],
  );
}
