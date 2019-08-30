import {
    SET_AUTH_STATUS,
    SET_MESSAGES,
    SET_USER_DATA,
    SET_WRITTEN_MESSAGE
} from './types';
import { Dispatch } from 'redux';
import firebase from 'firebase';

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
    date: Date | null;
    uid: string;
}

// Write message action
export const setWrittenMessage = (message: MessageData) => {
    return async (dispatch: Dispatch) => {
        const db = firebase.firestore();
        await db
            .collection('messages')
            .add({ message })
            .then((docRef: { id: string }) => {
                console.log('Document written with ID: ', docRef.id);
            })
            .then((err: any) => {
                console.error('Error adding document: ', err);
            });
        dispatch<DataActions>({
            type: SET_WRITTEN_MESSAGE,
            payload: message
        });
    };
    // db.collection('messages')
    //   .add({
    //     user: 'Ada',
    //     message: 'samnite',

    //     uid: '1815'
    //   })
    //   .then(function(docRef) {
    //     console.log('Document written with ID: ', docRef.id);
    //   })
    //   .catch(function(error) {
    //     console.error('Error adding document: ', error);
    //   });
};

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
                        date: new Date(doc.data().date),
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
export const setUserData = (name: string, uid: string) => {
    const data = { name: name, uid: uid };
    return (dispatch: Dispatch) => {
        dispatch<DataActions>({
            type: SET_USER_DATA,
            payload: data
        });
    };
};
