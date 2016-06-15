export const DEFAULT_TTL = 20
const INITIAL_STATE = {
  today: {
    ttlMinutes: DEFAULT_TTL
  },
  tomorrow: {
    ttlMinutes: DEFAULT_TTL
  }
};
import { FETCH_TODAYS_AGENDA } from '../actions/index';

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case FETCH_TODAYS_AGENDA:
      const oldToday = state.today
      return {
        ...state,
        today: {
          ...oldToday,
          refreshedAt: new Date(),
          events: action.payload.data
        }
      }
    default:
      return state;
  };
}
