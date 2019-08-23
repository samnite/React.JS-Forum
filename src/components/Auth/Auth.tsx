import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthFormComponent } from './AuthForm';
import { connect } from 'react-redux';
import { setAuthStatus, setUserName } from '../../store/data/actions';
import { firebaseConfig } from '../../firebase_config';
import {RootState} from '../../store/store';
import {DataState} from '../../store/data/reducer'


const mapStateToProps = ({data}: RootState): { data: DataState } => ({data});

class Auth extends React.Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // @ts-ignore
        this.props.setUserName(user.email)
        // @ts-ignore
        this.props.setAuthStatus(true);
        console.log(user, user.email);
      } else {
        console.log('non user');
        // @ts-ignore
        this.props.setAuthStatus(false);
      }
    });
  }

  render() {
    return <AuthFormComponent />;
  }
}


export default connect(
  mapStateToProps,
  { setAuthStatus, setUserName }
)(Auth);
