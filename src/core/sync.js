// @flow

import throttle from 'lodash/throttle';
import type { Store } from 'redux';

const syncOnUpdate = (store: Store) => next => action => next(action);

export default syncOnUpdate;
