import {
    SET_AUTH_STATUS,
    SET_MESSAGES,
    SET_USER_DATA,
    SET_WRITTEN_MESSAGE
} from './types';
import { DataActions, MessageData } from './actions';

export interface DataState {
    isAuth: boolean;
    uid: string;
    user: string;
    messages: MessageData[];
    message: MessageData;
}

export const initialState: DataState = {
    isAuth: false,
    uid: '',
    user: '',
    messages: [],
    message: {
        user: '',
        message: '',
        date: null,
        uid: '',
        key: ''
    }
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
        case SET_USER_DATA: {
            return {
                ...state,
                user: action.payload.name,
                uid: action.payload.uid
            };
        }
        case SET_MESSAGES: {
            return { ...state, messages: action.payload };
        }
        case SET_WRITTEN_MESSAGE: {
            return { ...state, message: action.payload };
        }

        default:
            return state;
    }
}
