import { SET_AUTH_STATUS, SET_USER_NAME } from './types';
import { DataActions } from './actions';

export interface DataState {
  isAuth: boolean;
  user: string;
}

export const initialState: DataState = {
  isAuth: false,
  user: ''
};

export function dataReducer(
  state = initialState,
  action: DataActions
): DataState {
  switch (action.type) {
    case SET_AUTH_STATUS: {
      return {
        ...state,
        isAuth: action.payload
      };
    }
    case SET_USER_NAME: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}
