import axios from 'axios';

export const FETCH_TODAYS_AGENDA = 'FETCH_TODAYS_AGENDA';

//TODO: make this configurable based on ENV
const ROOT_URL = 'http://localhost:3000'

export function fetchTodaysAgenda(){
  const req = axios.get(`${ROOT_URL}/today.json`);

  return {
    type: 'FETCH_TODAYS_AGENDA',
    payload: req
  };
}
