import axios from 'axios';

export const FETCH_TODAYS_AGENDA = 'FETCH_TODAYS_AGENDA';
export const FETCH_TRELLO_COLUMN = 'FETCH_TRELLO_COLUMN';

export const TOGGLE_NAV_CYCLING = 'TOGGLE_NAV_CYCLING'

export function fetchTodaysAgenda(){
  const req = axios.get(`/today.json`, {'headers': {
        'Content-Type': 'application/json'
    }});

  return {
    type: FETCH_TODAYS_AGENDA,
    payload: req
  };
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

export function toggleNavCycling(){
  return {
    type: TOGGLE_NAV_CYCLING
  }
}
