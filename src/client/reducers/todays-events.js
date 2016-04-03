const INITIAL_STATE = [];
import { FETCH_TODAYS_AGENDA } from '../actions/index';

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_TODAYS_AGENDA:
      return action.payload.data;
    default:
      return state;
  };
}
