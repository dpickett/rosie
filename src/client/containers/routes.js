import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DefaultLayout from '../components/default-layout';

export default (store) => (
  <Route path="/" component={DefaultLayout} />
);
