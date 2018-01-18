// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import throttle from 'lodash/throttle';
import { BrowserRouter } from 'react-router-dom';

import { loadState, saveState } from './core/localStorage';

import reducers from './reducers';

import App from './components/App';
import Routes from './Routes';

import './index.css';

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App><Routes /></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);
