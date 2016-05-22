const INITIAL_STATE = {}
import { FETCH_TRELLO_COLUMN, SHUFFLE_TRELLO_COLUMN } from '../actions/index';
import _ from 'lodash';

export default (state = INITIAL_STATE, action) => {
  if(action.type === FETCH_TRELLO_COLUMN){
    return {
      ...state,
      [action.payload.data.attrs.name]: {
        refreshedAt: new Date(),
        list: action.payload.data.attrs.cards
      }
    };
  }
  else if(action.type === SHUFFLE_TRELLO_COLUMN) {
    let columnState = state[action.payload];
    if(columnState && columnState.list){
      let newList = _.shuffle(columnState.list)
      return {
        ...state,
        [action.payload]: {
          ...columnState,
          list: newList
        }
      }
    }
    else {
      return state;
    }
  }
  else {
      return state
  }
}
