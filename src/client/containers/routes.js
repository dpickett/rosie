import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import DefaultLayout from '../components/default-layout';
import TodaysAgenda from '../containers/todays-agenda';
import TrelloList from '../containers/trello-list';
import SignInPrompt from '../components/sign-in-prompt';

export default (store) => (
  <Router>
    <Route path="/require-sign-in" component={SignInPrompt} />
    <Route path="/" component={DefaultLayout}>
      <IndexRoute component={TodaysAgenda} />
      <Route path="trello/:trelloColumnName" component={TrelloList} />
    </Route>
  </Router>
);
