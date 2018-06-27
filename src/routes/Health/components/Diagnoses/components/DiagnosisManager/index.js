import React from 'react';
import {Form, Select, Input, Checkbox} from 'antd';
import moment from 'moment';
import DiagnosisSelect from '../../../../../../components/Autosuggest/containers/DiagnosisSelect';
import {DateField} from "../../../../../../components/FormCustomFields/index";

const formItemLayoutDefault = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 13,
            offset: 7,
        },
    },
};

const FormItem =  Form.Item;
const DiagnosisManager = (props) => {
    //console.log(props);
    const {form, formItemLayout=formItemLayoutDefault, healthRecord={}} = props;
    const {getFieldDecorator} = form;

    const {isPrimary=false, riskLevel, details={}} = healthRecord;
    const {id='', code={}, date='',status='',notes=''} = details;
    const {id:codeId=''} = code;
    return <React.Fragment>
        <FormItem
            {...formItemLayout}
            label='Select Diagnosis'
        >
            {getFieldDecorator('code', {
                    initialValue: codeId,
                    rules: [{required: true, message: "Select Diagnosis"}],
                }
            )(
                <DiagnosisSelect />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Risk Level'
        >
            {getFieldDecorator('riskLevel', {
                initialValue: riskLevel,
                    rules: [{required: true, message: "Select Risk Level"}],
                }
            )(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'low'}>Low</Select.Option>
                    <Select.Option key={'medium'}>Medium</Select.Option>
                    <Select.Option key={'high'}>High</Select.Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Status'
        >
            {getFieldDecorator('status', {
                    initialValue: status,
                    rules: [{required: true, message: "Select Status"}],
                }
            )(
                <Select style={{width:'100%'}}>
                    <Select.Option key={'1'}>Active</Select.Option>
                    <Select.Option key={'3'}>Refuted</Select.Option>
                </Select>
            )}
        </FormItem>
        <FormItem
            {...tailFormItemLayout}
        >
            {getFieldDecorator('isPrimary',
                {
                    initialValue: isPrimary,
                    valuePropName: 'checked'
                }
            )(
                <Checkbox>Current</Checkbox>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Date of Onset'
        >
            {getFieldDecorator('date', {
                    initialValue: date ? moment(date) : undefined,
                    rules: [{required: true, message: "Select Date of Onset"}],
                }
            )(
                <DateField />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes',{
                initialValue: notes
                }
            )(
                <Input.TextArea  />
            )}
        </FormItem>
    </React.Fragment>
}

export default DiagnosisManager;



export const prepareInput = (values) => {
    const {code,riskLevel, status, isPrimary, date, notes} = values;
    return {
        diagnosis: {
            code,riskLevel, status, isPrimary, date, notes
        }
    }
}