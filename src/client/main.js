import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'

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
    )
  )
}

const store = configureStore(rootReducer, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router,
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <RosieApp history={history} routes={routes} store={store} />,
  document.getElementById('root')
);


