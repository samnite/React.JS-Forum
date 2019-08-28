import { SET_AUTH_STATUS, SET_MESSAGES, SET_USER_NAME } from './types';
import { DataActions, MessageData } from './actions';

export interface DataState {
    isAuth: boolean;
    user: string;
    messages: MessageData[];
}

export const initialState: DataState = {
    isAuth: false,
    user: '',
    messages: []
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
        case SET_MESSAGES: {
            return { ...state, messages: action.payload };
        }

        default:
            return state;
    }
}
