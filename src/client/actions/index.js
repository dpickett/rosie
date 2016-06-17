import axios from 'axios';

export const FETCH_TODAYS_AGENDA = 'FETCH_TODAYS_AGENDA';
export const FETCH_TOMORROWS_AGENDA = 'FETCH_TOMORROWS_AGENDA';
export const FETCH_TRELLO_COLUMN = 'FETCH_TRELLO_COLUMN';
export const SHUFFLE_TRELLO_COLUMN = 'SHUFFLE_TRELLO_COLUMN';

export const TOGGLE_NAV_CYCLING = 'TOGGLE_NAV_CYCLING'

function ttlExceeded(ttl, refreshedAt){
  const age = (new Date()) - refreshedAt;
  return age > ttl * 60 * 1000;
}

export function fetchAgenda(key, ttl, refreshedAt){
  const req = axios.get(`/${key}.json`, {'headers': {
    'Content-Type': 'application/json'
  }});

  if(!refreshedAt || ttlExceeded(ttl, refreshedAt)) {
    if(key === 'today'){
      return {
        type: FETCH_TODAYS_AGENDA,
        payload: req
      };
    }
    if(key === 'tomorrow'){
      return {
        type: FETCH_TOMORROWS_AGENDA,
        payload: req
      }
    }
  }
  else {
    return {
      type: 'NOOP'
    }
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
