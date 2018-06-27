/**
 * Created by Pavel on 27.11.2017.
 */
import React from 'react';
import {Redirect, Link} from 'react-router-dom'
import './register.css'
import PhoneForm from '../../../../components/PhoneForm';

import { Modal,Card, Form,  DatePicker, Input, Radio, Button, Checkbox } from 'antd';
import { withApollo } from 'react-apollo'
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
import moment from 'moment';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
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
const dateFormat = 'MM/DD/YYYY';
class NormalRegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {checked:true, loading:false};
        this.stopLoading = this.stopLoading.bind(this);
        this.showTerms = this.showTerms.bind(this);
        this.showPolicy = this.showPolicy.bind(this);
    }
    componentWillMount() {
        // Run query here(check Request api). You can check how it's done in App components.
        // and update the state with the info.
        // If in the query result it says, userIsRegistered, then show confirmRegistration components(need to create) with the following fields: Enter email(need to check if this request has the same email as we will enter), enter new password, confirm password.
    }
    handleCheckboxChange =()=> {
        this.setState({checked: !this.state.checked});
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                return onSubmit(values,  this.stopLoading);
            }
        });
    };
    showTerms(e) {
        e.preventDefault();
        Modal.info({
            title: 'Terms of use',
            content: (
                <div>
                    Terms of use
                </div>
            ),
            onOk() {},
        });
    };
    showPolicy(e) {
        e.preventDefault();
        Modal.info({
            title: 'Privacy policy',
            content: (
                <div>
                    Privacy policy
                </div>
            ),
            onOk() {},
        });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(this.props.intl.messages.user_inconsistent);
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value /*&& this.state.confirmDirty*/) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    stopLoading(){
        this.setState({ loading: false });
    }
    disabledDate = (current) => {
        // Can not select future
        return current && current > moment().endOf('day');

    }
    render() {
        const token = this.props.token;
        const form = this.props.form;
        if (token !== '') {
            return  <Redirect to={{
                pathname: '/'
            }} />;
        }
        const phoneNumberError = form.getFieldError('phone[number]');
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        const termsOfUseLink = <a onClick={this.showTerms}>{intl.messages.terms_of_use}</a>;
        const policyLink = <a onClick={this.showPolicy}>{intl.messages.privacy_policy}</a>;
        return (
            <div className="register-form" style={{padding:'0 20%'}}>
                <Card
                    title={intl.messages.user_sign_up}
                >
            <Form onSubmit={this.handleSubmit} >

                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_first_name}
                    hasFeedback
                >
                    {getFieldDecorator('first_name', {
                        rules: [{ required: true, message:intl.messages.user_first_name_rule , whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_last_name}
                    hasFeedback
                >
                    {getFieldDecorator('last_name', {
                        rules: [{ required: true, message:intl.messages.user_last_name_rule, whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_gender}
                >
                    {getFieldDecorator('gender',{
                        rules: [{ required: true, message:intl.messages.user_gender_rule, whitespace: true }],
                    })(
                        <RadioGroup>
                            <RadioButton value="male">{intl.messages.user_male}</RadioButton>
                            <RadioButton value="female">{intl.messages.user_female}</RadioButton>
                        </RadioGroup>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_birthday}
                    hasFeedback
                >
                    {getFieldDecorator('birthday', {
                        rules: [{
                            type: 'object', message:intl.messages.user_birthday_rule_type,
                        }, {
                            required: true, message:intl.messages.user_birthday_rule_required ,
                        }],
                    })(
                        <DatePicker format={dateFormat} allowClear={false} disabledDate={this.disabledDate} />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_email}
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: intl.messages.user_email_rule_type,
                        }, {
                            required: true,  message: intl.messages.user_email_rule_required,
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_password}
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,  pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$', message:intl.messages.user_password_rule,
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_confirmPassword}
                    hasFeedback
                >
                    {getFieldDecorator('password_repeat', {
                        rules: [{
                            required: true, message: intl.messages.user_confirmPassword_rule,
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                {

                }
                <FormItem
                    {...formItemLayout}
                    label={intl.messages.user_phone_number}
                    required
                    validateStatus={phoneNumberError ? 'error' : ''}
                    help={phoneNumberError || ''}

                >

                    <PhoneForm getFieldDecorator={getFieldDecorator} required form={form} />

                </FormItem>

                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',

                     })(
                        <Checkbox onChange={this.handleCheckboxChange.bind(this)} >agreement</Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button disabled={this.state.checked} loading={this.state.loading} type="primary" htmlType="submit" className="register-form-button">
                        {intl.messages.user_sign_up}
                    </Button>
                    {intl.messages.user_or} <Link to={'/login'}>{intl.messages.user_login_now}</Link>
                </FormItem>
            </Form>
                </Card>
            </div>
        );
    }
}
const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
export default withApollo(injectIntl(WrappedNormalRegisterForm));