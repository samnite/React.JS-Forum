import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';

const { TextArea } = Input;
const mapStateToProps = ({ data }) => ({ data });

const hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class _WriteMessage extends Component {
    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        const messageError =
            isFieldTouched('message') && getFieldError('message');

        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSignOut}>
                    <Form.Item
                        validateStatus={messageError ? 'error' : ''}
                        help={messageError || ''}
                    >
                        {getFieldDecorator('message', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your message!'
                                }
                            ]
                        })(
                            <TextArea
                                rows={4}
                                prefix={
                                    <Icon
                                        type="message"
                                        style={{
                                            color: 'rgba(0,0,0,.25)'
                                        }}
                                    />
                                }
                                placeholder="Your message"
                                style={{
                                    width: '400px',
                                    margin: '0px'
                                }}
                            />
                        )}
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Post it!
                    </Button>
                </Form>
            </div>
        );
    }
}

export const WriteMessage = Form.create({
    name: 'horizontal_login'
})(_WriteMessage);

export const WriteMessageComponent = connect(mapStateToProps)(WriteMessage);
