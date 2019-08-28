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
    // console.log(db)
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
    db.collection('messages')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data().message}`);
        });
      });
  };

  render() {
    return <div>MessagesComponent</div>;
  }
}

export default MessagesComponent;
