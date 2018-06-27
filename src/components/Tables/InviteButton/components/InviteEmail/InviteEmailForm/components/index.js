import React from 'react';
import {Card,Row,Col,Select,Form,Radio,DatePicker,TimePicker, Input} from 'antd';
import moment from 'moment';
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const InviteFormModal = ({ form, formItemLayout,targetKeys,selectedKeys,handleChange,handleSelectChange}) => {
  

     const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    const children = [];
    return   <Form>
    <FormItem
        label="Enter your Message"
    >
                {getFieldDecorator('email', {
                })(
                    <Input />
                  
                )}
    </FormItem>
    </Form>
}

export default InviteFormModal;