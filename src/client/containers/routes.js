import React from 'react';
import { Route, IndexRoute } from 'react-router';

import DefaultLayout from '../components/default-layout';
import TodaysAgenda from '../containers/todays-agenda';
import TrelloList from '../containers/trello-list';

export default (store) => (
  <Route path="/" component={DefaultLayout}>
    <IndexRoute component={TodaysAgenda} />
    <Route path="trello/:trelloColumnName" component={TrelloList} />
  </Route>

);
