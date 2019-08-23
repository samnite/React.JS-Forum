import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthFormComponent } from './AuthForm';
import { connect } from 'react-redux';
import { setAuthStatus } from '../../store/data/actions';
import { firebaseConfig } from '../../firebase_config';

class Auth extends React.Component {
  componentDidMount() {
    console.log(this.props.data)
    firebase.initializeApp(firebaseConfig);
    // To disabled submit button at the beginning.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.props.setAuthStatus(true);
      } else {
        console.log('non user');
        this.props.setAuthStatus(false);
      }
    });
  }

  render() {
    return <AuthFormComponent />;
  }
}

const mapStateToProps = ({ data }) => ({ data });

export default connect(
  mapStateToProps,
  { setAuthStatus }
)(Auth);
