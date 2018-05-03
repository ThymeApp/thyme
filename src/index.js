// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { loadState, saveState } from './core/localStorage';

import migrate from './middleware/migrate';
import reducers from './reducers';

import App from './components/App';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const reduxDevTools = process.env.NODE_ENV === 'development' ?
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;

const store = createStore(
  reducers,
  loadState(),
  compose(
    reduxDevTools,
    applyMiddleware(migrate),
  ),
);

// save changes to store to localStorage
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

registerServiceWorker();
