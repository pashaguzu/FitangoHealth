import React from 'react';
import {Card, Transfer, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const TeamManager = ({mockData = {}, form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    // const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    console.log(mockData);
    return <Transfer
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => item.title}
    />
}

export default TeamManager;