// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import throttle from 'lodash/throttle';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { loadState, saveState } from './core/localStorage';

import reducers from './reducers';

import App from './components/App';
import Routes from './Routes';

import './index.css';

const history = createHistory();

const store = createStore(
  reducers,
  loadState(),
  // eslint-disable-next-line no-underscore-dangle
  compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App><Routes /></App>
    </Router>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);
