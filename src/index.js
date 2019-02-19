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
import { onExtensionConnected, changeState } from './core/extensions/events';

import { updateAvailable } from './actions/app';

import createStore from './createStore';
import runMigrations from './migrations';

import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import Routes from './Routes';
import { register, unregister } from './serviceWorker';

import { registerStore } from './register/reducer';
import RegisterProvider from './register/Provider';
import loadPlugins from './plugins/load';

const initialState = runMigrations(loadState());

const store: ThymeStore = createStore(initialState);

registerStore(store);
saveOnStoreChange(store);
syncOnUpdate(store);
setupStateResolver(() => store.getState());

// broadcast state changes to extensions
store.subscribe(() => changeState(store.getState()));
onExtensionConnected(() => changeState(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <RegisterProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL || ''}>
        <ErrorBoundary>
          <App>
            <Routes />
          </App>
        </ErrorBoundary>
      </BrowserRouter>
    </RegisterProvider>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);

loadPlugins(store.dispatch);

register({
  onUpdate() {
    unregister();
    store.dispatch(updateAvailable());
  },
});
