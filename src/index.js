import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import throttle from 'lodash/throttle';

import { loadState, saveState } from './core/localStorage';

import reducers from './reducers';

import App from './components/app/App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

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
    <App/>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
