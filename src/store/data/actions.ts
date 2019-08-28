import { SET_AUTH_STATUS, SET_MESSAGES, SET_USER_NAME } from './types';
import { Dispatch } from 'redux';
import firebase from 'firebase';

export interface DataActions {
    type: 'SET_AUTH_STATUS' | 'SET_USER_NAME' | 'SET_MESSAGES';
    payload: any;
}

export interface MessageData {
    user: string;
    message: string;
    date: Date;
    uid: string;
}

// Set array of messages
export const setMessages = () => {
    return async (dispatch: Dispatch) => {
        const db = firebase.firestore();
        const messageCollection: MessageData[] = [];
        await db
            .collection('messages')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    // console.log(`${doc.id} => ${doc.data().message}`);
                    messageCollection.push({
                        user: doc.data().user,
                        message: doc.data().message,
                        date: new Date(doc.data().date.seconds),
                        uid: doc.data().uid
                    });
                });
            });

        dispatch<DataActions>({
            type: SET_MESSAGES,
            payload: messageCollection
        });
    };
};

// Set Auth Status
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
