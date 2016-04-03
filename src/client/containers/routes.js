import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DefaultLayout from '../components/default-layout';
import TodaysAgenda from '../containers/todays-agenda';

export default (store) => (
  <Route path="/" component={DefaultLayout}>
    <IndexRoute component={TodaysAgenda} />
  </Route>

);
