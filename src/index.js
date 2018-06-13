// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { loadState, saveOnStoreChange } from './core/localStorage';
import './core/analytics';
import { setupStateResolver } from './core/fetch';

import reducers from './reducers';
import runMigrations from './migrations';

import App from './components/App';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const initialState = runMigrations(loadState());

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools()(),
);

registerServiceWorker(store.dispatch);
saveOnStoreChange(store);
setupStateResolver(() => store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App><Routes /></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);
