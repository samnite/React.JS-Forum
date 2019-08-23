import { SET_AUTH_STATUS, SET_USER_NAME } from './types';
import { Dispatch } from 'redux';

export interface DataActions {
  type: 'SET_AUTH_STATUS' | 'SET_USER_NAME';
  payload: any;
}

// Set Event code
export const setAuthStatus = (isAuth: boolean) => (dispatch: Dispatch) => {
  dispatch<DataActions>({
    type: SET_AUTH_STATUS,
    payload: isAuth
  });
};

// Set current username
export const setUserName = (name: string) => (dispatch: Dispatch) => {
  dispatch<DataActions>({
    type: SET_USER_NAME,
    payload: name
  });
};
