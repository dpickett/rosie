import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';

import RosieApp from './containers/rosie-app';


import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './reducers/root-reducer';

import makeRoutes from './containers/routes';


const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: 'SomeName',
});

function configureStore(initialState) {
  return createStore(
    rootReducer,
    {},
    applyMiddleware(
      promiseMiddleware
    )
  )
}

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

const routes = makeRoutes(store);

ReactDOM.render(
  <RosieApp history={history} routes={routes} store={store} />,
  document.getElementById('root')
);


