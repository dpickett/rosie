import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import todaysEvents from './todays-events';
import trelloColumn from './trello-column';

export default combineReducers({
  router,
  todaysEvents: todaysEvents,
  cards: trelloColumn
});
