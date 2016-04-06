const INITIAL_STATE = {}
import { FETCH_TRELLO_COLUMN } from '../actions/index';

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCH_TRELLO_COLUMN:
      return {
        ...state,
        [action.payload.data.attrs.name]: action.payload.data.attrs.cards
      };
    default:
      return state
  }
}
