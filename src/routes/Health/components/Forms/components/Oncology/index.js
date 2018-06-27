import React from 'react';
import {Form, Input, Select} from 'antd';
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {DiagnosisSelect} from "../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import {withOncologyEnumsQuery} from "./query";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const OncologyFormPure = ({form, ...otherProps}) => {
    const {getFieldDecorator} = form;
    const {oncologyTypes=[], oncologyDisorders=[], oncologyBehaviors=[], loading=false, formItemLayout} = otherProps;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Diagnosis"
        >
            {getFieldDecorator('diagnosis', {
                //initialValue: title,
                rules: [{
                    required: true,
                    message: "Please select Diagnosis",
                }],
            })(
                <DiagnosisSelect />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="Date Enrolled"
        >
            {getFieldDecorator('date', {
                //initialValue: title,
                rules: [{
                    required: true,
                    message: "Please select Date",
                }],
            })(
                <DateField />
            )}
        </FormItem>



        <FormItem
            {...formItemLayout}
            label='Diagnosis Type'
        >
            {getFieldDecorator('type', {
                rules: [{
                    required: true,
                    message: "Select Type",
                }],
                }
            )(
                <Select>
                    {oncologyTypes.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Disorder'
        >
            {getFieldDecorator('disorder', {
                rules: [{
                    required: true,
                    message: "Please select Disorder",
                }],
                }
            )(
                <Select>
                    {oncologyDisorders.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Behavior'
        >
            {getFieldDecorator('behavior', {
                rules: [{
                    required: true,
                    message: "Please select Behavior",
                }],
                }
            )(
                <Select>
                    {oncologyBehaviors.map(info => {
                        return  <Select.Option key={info.name}>{info.description}</Select.Option>
                    })}
                </Select>
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Organ System'
        >
            {getFieldDecorator('organSystem', {
                }
            )(
                <Input  />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label='Anatomic Site'
        >
            {getFieldDecorator('anatomicSite', {
                }
            )(
                <Input  />
            )}
        </FormItem>
    </Form>
}

export const OncologyForm = withOncologyEnumsQuery(OncologyFormPure);

export const prepareOncologyInput = values => {
    const {diagnosis,
        type,
        disorder,
        behavior,
        organSystem,
        anatomicSite,
        date} = values;

    return {
        oncology: {
            diagnosis,
            type,
            disorder,
            behavior,
            organSystem,
            anatomicSite,
            date
        }
    }
}