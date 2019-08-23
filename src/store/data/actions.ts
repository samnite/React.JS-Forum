import { SET_AUTH_STATUS } from './types';
import { Dispatch } from 'redux';

export interface DataActions {
  type: 'SET_AUTH_STATUS';
  payload: any;
}

// Set Event code
export const setAuthStatus = (isAuth: boolean) => (dispatch: Dispatch) => {
  dispatch<DataActions>({
    type: SET_AUTH_STATUS,
    payload: isAuth
  });
};
