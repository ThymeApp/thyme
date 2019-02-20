// @flow

import { useContext, useMemo } from 'react';
import { ReactReduxContext } from 'react-redux';

export function useMappedState<SP, SS>(mapState: (state: SS) => SP): SP {
  const context = useContext(ReactReduxContext);
  const state = context.store.getState();

  return useMemo(
    () => mapState(state),
    [state, mapState],
  );
}

export function useDispatch<DP, D>(mapDispatch: (dispatch: D) => DP): DP {
  const context = useContext(ReactReduxContext);

  return useMemo<DP>(
    () => mapDispatch(context.store.dispatch),
    [context.store.dispatch, mapDispatch],
  );
}
