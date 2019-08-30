import React, { Component } from 'react';
import { Button, Form, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import { MessageData, setWrittenMessage } from '../../store/data/actions';
import { RootState } from '../../store/store';
import { DataState } from '../../store/data/reducer';
import { FormComponentProps } from 'antd/es/form';

interface FormProps extends FormComponentProps {}

const { TextArea } = Input;
const mapStateToProps = ({ data }: RootState): { data: DataState } => ({
    data
});

const hasErrors = (fieldsError: { [x: string]: unknown }) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class _WriteMessage extends Component<FormProps, any> {
    state = {
        message: ''
    };

    triggerChange = (changedValue: any) => {
        // Should provide an event to pass value to Form.
        // @ts-ignore
        const { onChange } = this.props;
        if (onChange) {
            onChange({
                ...this.state,
                ...changedValue
            });
        }
    };

    handleChangeField = (e: any) => {
        this.setState({
            message: e.target.value
        });
        this.triggerChange({});
    };

    handleSubmit = (e: any) => {
        e.preventDefault();
        //@ts-ignore
        this.props.setWrittenMessage<MessageData>({
            // @ts-ignore
            name: this.props.data.user,
            message: this.state.message,
            // @ts-ignore
            uid: this.props.data.uid,
            date: new Date()
        });
        console.log(e);

        console.log(this.props.form);
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        const messageError =
            isFieldTouched('message') && getFieldError('message');

        // @ts-ignore

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
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
                            onChange={this.handleChangeField}
                            label="inputMessage"
                            rows={4}
                            // @ts-ignore
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Post it!
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const WriteMessage = Form.create({
    name: 'message'
})(_WriteMessage);

export const WriteMessageComponent = connect(
    mapStateToProps,
    { setWrittenMessage }
)(WriteMessage);
