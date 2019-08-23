import { SET_AUTH_STATUS } from './types';
import { DataActions } from './actions';

export interface DataState {
  isAuth: boolean;
}

export const initialState: DataState = {
  isAuth: false
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
    default:
      return state;
  }
}
