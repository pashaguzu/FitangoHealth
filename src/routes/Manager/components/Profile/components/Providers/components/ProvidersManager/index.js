import React from 'react';
import {Card, Transfer, Checkbox, Input, Col, Select, Form, DatePicker, Button,} from 'antd';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const dateFormat = 'YYYY/MM/DD';


const ProvidersManager = ({form, formItemLayout, targetKeys, selectedKeys, handleChange, handleSelectChange}) => {


    const {getFieldDecorator} = form;
    // const {email='', gender='',fullName='',birthday='', phoneFormatted={},addressText={}, chemotherapies=[]} = patient;
    return <Form>

        <FormItem
            {...formItemLayout}
            label="Relationship"
        >
            {getFieldDecorator('relationship', {})(
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

    </Form>
}

export default ProvidersManager;