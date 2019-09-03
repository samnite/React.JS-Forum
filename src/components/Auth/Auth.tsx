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

interface MethodsProps {
    setUserData(user: string | null, uid: string): void;

    setAuthStatus(isAuth: boolean): void;

    setMessages(): void;
}

class Auth extends React.Component<MethodsProps> {
    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUserData(user.email, user.uid);
                this.props.setAuthStatus(true);
                this.props.setMessages();
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

export default connect(
    mapStateToProps,
    { setAuthStatus, setUserData, setMessages }
)(Auth);
