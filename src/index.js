// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import { loadState, saveOnStoreChange } from './core/localStorage';
import syncOnUpdate from './core/sync';
import './core/analytics';
import { setupStateResolver } from './core/fetch';

import createStore from './createStore';
import runMigrations from './migrations';

import App from './components/App';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const initialState = runMigrations(loadState());

const store = createStore(
  initialState,
  composeWithDevTools({})(),
);

registerServiceWorker(store.dispatch);
saveOnStoreChange(store);
syncOnUpdate(store);
setupStateResolver(() => store.getState());

// when on main domain, serve app from /thyme, all other cases serve from /
const basename = window.location.hostname === 'usethyme.com'
  ? '/thyme/'
  : process.env.PUBLIC_URL;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') || document.createElement('div'),
);
