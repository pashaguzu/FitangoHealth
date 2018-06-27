import React from 'react';
import {Form, Input} from 'antd';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const ClinicalTrialForm = ({cancer={}, form, formItemLayout}) => {
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
            label='Clinical Trial'
        >
            {getFieldDecorator('trial', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Trial"}],
                }
            )(
                <ClinicalTrialSelect />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Clinical Trial Cohort'
        >
            {getFieldDecorator('cohort', {
                }
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Clinical Trial Sponsor'
        >
            {getFieldDecorator('sponsor', {
                }
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>
    </Form>
}

export default ClinicalTrialForm;


export const prepareOncologyInput = values => {
    const {date,
        trial,
        cohort,
        sponsor} = values;

    return {
        clinicalTrial: {
            date,
            trial,
            cohort,
            sponsor,
        }
    }
}