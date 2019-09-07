import {
    SET_AUTH_STATUS,
    SET_MESSAGES,
    SET_USER_DATA,
    SET_WRITTEN_MESSAGE
} from './types';
import { Dispatch } from 'redux';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { timeConverter } from '../../utils/convertDate';
import { firestore } from 'firebase';

export interface DataActions {
    type:
        | 'SET_AUTH_STATUS'
        | 'SET_USER_NAME'
        | 'SET_MESSAGES'
        | 'SET_WRITTEN_MESSAGE';
    payload: any;
}

export interface MessageData {
    user: string;
    message: string;
    date: Date | firestore.Timestamp | null;
    uid: string;
    key?: string | Date;
}

// Write message action
export const setWrittenMessage = (message: MessageData) => {
    return async (dispatch: Dispatch) => {
        const db = firebase.firestore();
        await db
            .collection('messages')
            .add({ message })
            .then((docRef: { id: string }) => {
                console.log(message);
                console.log('Document written with ID: ', docRef.id);
            })
            .catch((err: any) => {
                console.error('Error adding document: ', err);
            });
        dispatch<DataActions>({
            type: SET_WRITTEN_MESSAGE,
            payload: message
        });
    };
};

// Set array of messages
export const setMessages = () => {
    return async (dispatch: Dispatch) => {
        const db = firebase.firestore();
        const messageCollection: MessageData[] = [];
        await db
            .collection('messages')
            .orderBy('message.date', 'asc') //sort posts by field 'date'
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    messageCollection.push({
                        user: doc.data().message.user,
                        message: doc.data().message.message,
                        date: doc.data().message.date,
                        uid: doc.data().message.uid,
                        key: timeConverter(doc.data().message.date)
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
export const setUserData = (name: string, uid: string) => {
    const data = { name: name, uid: uid };
    return (dispatch: Dispatch) => {
        dispatch<DataActions>({
            type: SET_USER_DATA,
            payload: data
        });
    };
};
