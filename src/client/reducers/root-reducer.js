import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import Events from './events';
import trelloColumn from './trello-column';
import navCycle from './nav-cycle';
import listTimeToLive from './list-time-to-live';

export default combineReducers({
  router,
  events: Events,
  cards: trelloColumn,
  navCycle,
  listTimeToLive
});
