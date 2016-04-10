const INITIAL_STATE = { cycling: true }
import { TOGGLE_NAV_CYCLING } from '../actions/index';

export default function(state = INITIAL_STATE, action){
  switch(action.type){
    case TOGGLE_NAV_CYCLING:
      return {...state, cycling: !state.cycling}
    default:
      return state;
  }
}
