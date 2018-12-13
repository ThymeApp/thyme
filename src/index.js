// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { loadState, saveOnStoreChange } from './core/localStorage';
import syncOnUpdate from './core/sync';
import './core/analytics';
import { setupStateResolver } from './core/fetch';

import { updateAvailable } from './actions/app';

import createStore from './createStore';
import runMigrations from './migrations';

import App from './components/App';
import Routes from './Routes';
import { register } from './serviceWorker';

import { registerStore } from './register/reducer';
import loadPlugins from './plugins/load';
import { registerRegistration } from './core/service-worker';

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
  onRegister(registration) {
    registerRegistration(registration);
  },
  onUpdate(registration) {
    store.dispatch(updateAvailable());
    registration.unregister();
  },
});
