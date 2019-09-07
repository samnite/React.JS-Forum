import React from 'react';
import { Alert, Button, Form, Icon, Input } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth';

import { connect } from 'react-redux';
import { RootState } from '../../store/store';
import { DataState } from '../../store/data/reducer';
import { OwnProps } from '../../App';

const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

type State = Readonly<{
    wrongPass: boolean;
    loading: boolean;
}>;

export class _AuthForm extends React.Component<OwnProps, State> {
    state = {
        wrongPass: false,
        loading: false
    };

    componentDidMount() {
        // this.props.form.validateFields();
    }

    handleSignOut = () => {
        // e.preventDefault();
        firebase.auth().signOut();
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.props.data.isAuth) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(
                            values.username,
                            values.password
                        );
                } else {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            values.username,
                            values.password
                        )
                        .catch(err => {
                            if (err.code === 'auth/email-already-in-use') {
                                console.log(err.code);
                                firebase
                                    .auth()
                                    .signInWithEmailAndPassword(
                                        values.username,
                                        values.password
                                    )
                                    .catch(err => {
                                        console.log(err);
                                        this.setState({ wrongPass: true });
                                    });
                            }
                        });
                }
            }
        });
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        // Only show error after a field is touched.
        const usernameError =
            isFieldTouched('username') && getFieldError('username');
        const passwordError =
            isFieldTouched('password') && getFieldError('password');

        let formContent = null;
        if (this.props.data.isAuth) {
            formContent = (
                <Form layout="inline" onSubmit={this.handleSignOut}>
                    <p>{this.props.data.user}</p>
                    <Button type="primary" htmlType="submit">
                        Log out
                    </Button>
                </Form>
            );
        } else {
            formContent = (
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item
                        validateStatus={usernameError ? 'error' : ''}
                        help={usernameError || ''}
                    >
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                placeholder="Username"
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password!'
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                    />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            Login/Register
                        </Button>
                    </Form.Item>
                    {this.state.wrongPass ? (
                        <Alert
                            message="Wrong password"
                            type="error"
                            showIcon
                            closable
                        />
                    ) : null}
                </Form>
            );
        }

        return this.state.loading ? (
            <Button type="primary" loading>
                Loading
            </Button>
        ) : (
            formContent
        );
    }
}

export const AuthForm = Form.create({
    name: 'horizontal_login'
})(_AuthForm);

export const AuthFormComponent = connect(mapStateToProps)(AuthForm);
