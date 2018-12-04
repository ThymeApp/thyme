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

import registerPlugins from './plugins/register';

const initialState = runMigrations(loadState());

const store: ThymeStore = createStore(initialState);

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

registerPlugins(store);
register({
  onUpdate(registration) {
    store.dispatch(updateAvailable());
    registration.unregister();
  },
});
