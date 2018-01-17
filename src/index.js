import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import throttle from 'lodash/throttle';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';

import { loadState, saveState } from './core/localStorage';

import reducers from './reducers';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const history = createHistory();

const store = createStore(
  reducers,
  loadState(),
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
