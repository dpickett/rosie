import axios from 'axios';

export const FETCH_TODAYS_AGENDA = 'FETCH_TODAYS_AGENDA';
export const FETCH_TRELLO_COLUMN = 'FETCH_TRELLO_COLUMN';
export const SHUFFLE_TRELLO_COLUMN = 'SHUFFLE_TRELLO_COLUMN';

export const TOGGLE_NAV_CYCLING = 'TOGGLE_NAV_CYCLING'

export function fetchAgenda(key){
  const req = axios.get(`/${key}.json`, {'headers': {
        'Content-Type': 'application/json'
    }});

  if(key === 'today'){
    return {
      type: FETCH_TODAYS_AGENDA,
      payload: req
    };
  }
}

export function fetchTrelloColumn(columnName){
  const req = axios.get(`/trello/${encodeURIComponent(columnName)}.json`, { 'headers': {
    'Content-Type': 'application/json'
  }});

  return {
    type: FETCH_TRELLO_COLUMN,
    payload: req
  }
}

export function shuffleTrelloColumn(columnName){
  return {
    type: SHUFFLE_TRELLO_COLUMN,
    payload: columnName
  }
}

export function toggleNavCycling(){
  return {
    type: TOGGLE_NAV_CYCLING
  }
}
