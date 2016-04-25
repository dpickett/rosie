import { push } from 'react-router-redux';

export default function authorizationCheck({ dispatch, getState }) {
  return next => action => {
    if(action.payload && action.payload.status && action.payload.status === 401) {
      return next(push('/require-sign-in'));
    }
    else {
      return next(action);
    }
  };
}
