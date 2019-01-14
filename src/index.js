// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import './core/errorReporting';
import { loadState, saveOnStoreChange } from './core/localStorage';
import syncOnUpdate from './core/sync';
import './core/analytics';
import { setupStateResolver } from './core/fetch';
import './core/extensions/load';

import { updateAvailable } from './actions/app';

import createStore from './createStore';
import runMigrations from './migrations';

import App from './components/App';
import Routes from './Routes';
import { register } from './serviceWorker';

import { registerStore } from './register/reducer';
import loadPlugins from './plugins/load';

const initialState = runMigrations(loadState());

const store: ThymeStore = createStore(initialState);

registerStore(store);
saveOnStoreChange(store);
syncOnUpdate(store);
setupStateResolver(() => store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);

loadPlugins(store.dispatch);

register({
  onUpdate(registration) {
    store.dispatch(updateAvailable());
    registration.unregister();
  },
});
