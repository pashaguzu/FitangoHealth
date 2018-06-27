import React from 'react';
import {Card, Transfer, Checkbox, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const TeamManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    return <Form>
        <FormItem
            {...formItemLayout}
            label="First Name"
            required
        >
            {getFieldDecorator('firstName', {
                rules: [{required: true, message: "intl.messages.user_first_name_rule", whitespace: true}],
            })(
                <Input/>
            )}

        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Last Name"
            required
        >
            {getFieldDecorator('lastName', {
                rules: [{required: true, message: "intl.messages.user_first_name_rule", whitespace: true}],
            })(
                <Input/>
            )}

        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Relationship"

        >
            {getFieldDecorator('relationship', {
                rules: [{required: true, message: "intl.messages.user_gender_rule", whitespace: true}],
            })(
                <Select style={{width: 120}}>
                    <Option value="husband">Husband</Option>
                    <Option value="wife">Wife</Option>
                    <Option value="mother">Mother</Option>
                    <Option value="daughter">Daughter</Option>
                    <Option value="father">Father</Option>
                    <Option value="son">Son</Option>
                    <Option value="brother">Brother</Option>
                    <Option value="sister">Sister</Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Reporting"

        >
            {getFieldDecorator('reporting', {})(
                <Checkbox>Allow reporting</Checkbox>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label="Email"

        >{getFieldDecorator('email', {})(
            <Input/>
        )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Reporting"

        >
            {getFieldDecorator('reporting', {})(<Col>
                    <Checkbox>Email</Checkbox>
                    <Checkbox>Phone</Checkbox>
                    <Checkbox>SMS</Checkbox>
                </Col>
            )}
        </FormItem>
    </Form>
}

export default TeamManager;