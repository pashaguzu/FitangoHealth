import React from 'react';
import {Form, Input} from 'antd';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {InputUnits} from "../../../../../../components/FormCustomFields/components/InputUnits/index";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const PathologyForm = ({cancer={}, form, formItemLayout}) => {
    const {getFieldDecorator} = form;
    //const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    return <Form>
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
            label='Tumor Histology'
        >
            {getFieldDecorator('tumorHistology', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Histology"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumor Behaviour'
        >
            {getFieldDecorator('tumorBehavior', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Behaviour"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumor Grade'
        >
            {getFieldDecorator('tumorGrade', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Grade"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Size'
        >
            {getFieldDecorator('tumorSize', {
                    //initialValue: code,
                    rules: [{required: true, message: "Enter Tumor size"}],
                }
            )(
                <InputUnits />
            )}
        </FormItem>

    </Form>
}

export default PathologyForm;


export const preparePathologyInput = values => {
    const {date,
        tumorHistology,
        tumorBehavior,
        tumorGrade,
        tumorSize} = values;

    return {
        clinicalTrial: {
            date,
            tumorHistology,
            tumorBehavior,
            tumorGrade,
            tumorSize
        }
    }
}