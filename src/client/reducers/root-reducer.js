import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import todaysEvents from './todays-events';

export default combineReducers({
  router,
  todaysEvents: todaysEvents,
  somethingElse: function(initial_state = [], action){
    return initial_state;
  }
});
