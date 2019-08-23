import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { firebaseConfig } from '../../firebase_config';
import firebase from 'firebase/app';
import 'firebase/auth';

import { connect } from 'react-redux';

const mapStateToProps = ({ data }) => ({ data });

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

export class _AuthForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
    console.log(this.props.data);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        firebase
          .auth()
          .signInWithEmailAndPassword(values.username, values.password);
      }
    });
  };

  render() {
    const btnName = this.props.data.isAuth ? 'Log out' : 'Log in';
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
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={usernameError ? 'error' : ''}
          help={usernameError || ''}
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
            {btnName}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const AuthForm = Form.create({
  name: 'horizontal_login'
})(_AuthForm);

export const AuthFormComponent = connect(mapStateToProps)(AuthForm);
