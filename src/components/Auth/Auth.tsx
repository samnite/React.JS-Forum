import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthFormComponent } from './AuthForm';
import { connect } from 'react-redux';
import {
    setAuthStatus,
    setMessages,
    setUserData
} from '../../store/data/actions';
import { firebaseConfig } from '../../firebase_config';
import { RootState } from '../../store/store';
import { DataState } from '../../store/data/reducer';

const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

class Auth extends React.Component {
    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // @ts-ignore
                this.props.setUserData(user.email, user.uid);
                // @ts-ignore
                this.props.setAuthStatus(true);
                // @ts-ignore
                this.props.setMessages();
                console.log(user);
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
    { setAuthStatus, setUserData, setMessages }
)(Auth);
