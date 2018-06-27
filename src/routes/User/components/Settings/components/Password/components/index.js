/**
 * Created by Pavel on 08.12.2017.
 */
import React from 'react';
import { Input,Form, Button } from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};



class PasswordForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {displayedFamily: props};
        this.resetForm = this.resetForm.bind(this);
    }

    /**
     * Submit the password form
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit, resetForm } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                return onSubmit(values, resetForm);
            }
        });
    }

    resetForm () {
        this.props.form.resetFields();
    }

    render(){

        if (this.props.loading) {
            return (
                <div className='box'>
                    Loading...
                </div>
            );
        }
        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;

        return(

            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_currentpassword_label}
                >
                            {getFieldDecorator('current_password', {
                                rules: [{ required: true, message:intl.messages.user_newpassword_label, whitespace: true }],
                            })(
                                <Input  placeholder={intl.messages.user_currentpassword_label} type="password" />
                            )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_newpassword_label}
                    help={intl.messages.user_newpassword_help}
                >

                    {getFieldDecorator('password', {
                        rules: [{ required: true, message:intl.messages.user_newpassword_rule , whitespace: true }],
                    })(
                        <Input  placeholder={intl.messages.user_newpassword_label} type="password" />

                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_confirmnewpassword_label}
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{ required: true, message:intl.messages.user_confirmnewpassword_rule, whitespace: true }],
                    })(
                        <Input  placeholder={intl.messages.user_confirmnewpassword_label} type="password" />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button loading={this.state.loading} type="primary" htmlType="submit">
                        {intl.messages.user_changepassword}
                    </Button>
                </FormItem>
            </Form>

        );
    }

}

const WrappedPasswordForm = Form.create()(PasswordForm);
export default withApollo(injectIntl(WrappedPasswordForm));
