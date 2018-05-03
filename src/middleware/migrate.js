const migrateReduxData = store => (next) => {
  const initialState = store.getState().committedState;

  // return default middleware
  return action => next(action);
};

export default migrateReduxData;
