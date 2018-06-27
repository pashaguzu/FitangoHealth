import React from 'react';
import {Card, Input,Col,Select,Form, DatePicker,Button,} from 'antd';
import PhoneForm from '../../../../../../components/PhoneForm';
import moment from 'moment';
const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const ProfileManager = ({patient={}, form, formItemLayout}) => {
    const {getFieldDecorator} = form;
    const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    return   <Form>
    <FormItem
        {...formItemLayout}
        label="Full Name"
        required
    >
        <InputGroup >
            <Col span={8}>
                {getFieldDecorator('fullName', {
                    initialValue: fullName ,
                    rules: [{ required: true, message: "intl.messages.user_first_name_rule", whitespace: true }],
                })(
                <Input  />
                )}
            </Col>
        </InputGroup>
    </FormItem>
    <FormItem
        {...formItemLayout}
        label="Birthday"

    >
        {getFieldDecorator('birthday', {
            initialValue: moment(birthday),
            rules: [{
                type: 'object', message:"intl.messages.user_birthday_novalid",
            }, {
                required: true, message:"intl.messages.user_birthday_rule",
            }],
        })(
            <DatePicker format={dateFormat} allowClear={false} disabledDate={this.disabledDate} />
        )}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label="Gender"

    >
        {getFieldDecorator('gender', {
        initialValue: gender,
        rules: [{ required: true, message:"intl.messages.user_gender_rule", whitespace: true }],
    })(
        <Select style={{ width: 120 }} >
            <Option value="female">Female</Option>
            <Option value="male">Male</Option>
        </Select>
    )}
    </FormItem>


    <FormItem
        {...formItemLayout}
        label="Email"

    >{getFieldDecorator('email', {
        initialValue: email,
        rules: [{ required: true, type: 'email', message:"intl.messages.user_email_rule",}],
    })(
        <Input  />
    )}
    </FormItem>

    <FormItem
        {...formItemLayout}
        label="Phone number"
        required
    >
        <PhoneForm getFieldDecorator={getFieldDecorator} required phone={phoneFormatted} />
    </FormItem>

    <FormItem
        {...formItemLayout}
        label="Address"
    >
{getFieldDecorator('addressText', {
        initialValue: addressText
    })(
        <Input  />
    )}
    </FormItem>
</Form>
}

export default ProfileManager;