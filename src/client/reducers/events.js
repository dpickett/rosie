const INITIAL_STATE = {
  today: {},
  tomorrow: {}
};
import { FETCH_TODAYS_AGENDA } from '../actions/index';

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_TODAYS_AGENDA:
      return {
        ...state,
        today: {
          refreshedAt: new Date(),
          events: action.payload.data
        }
      }
    default:
      return state;
  };
}
