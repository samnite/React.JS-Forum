import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

class MessagesComponent extends React.Component {
    state = {};

    componentDidMount() {
        this.writeMessage();
    }

    writeMessage = () => {
        const db = firebase.firestore();
        console.log(db);
    };

    render() {
        return <div>MessagesComponent</div>;
    }
}

export default MessagesComponent;
