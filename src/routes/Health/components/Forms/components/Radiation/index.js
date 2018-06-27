import React from 'react';
import {Form, Input} from 'antd';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {InputUnits} from "../../../../../../components/FormCustomFields/components/InputUnits/index";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const RadiationForm = ({cancer={}, form, formItemLayout}) => {
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
            label='Treatment Anatomic Site'
        >
            {getFieldDecorator('treatmentAnatomicSite', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Treatment Anatomic Site"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Treatment Technique'
        >
            {getFieldDecorator('treatmentTechnique', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Treatment Technique"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Modality'
        >
            {getFieldDecorator('regionalModality', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Regional Modality"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Dose'
        >
            {getFieldDecorator('regionalDose', {
                    //initialValue: code,
                    rules: [{required: true, message: "Enter Regional Dose"}],
                }
            )(
                <InputUnits placeholderUnits={'units'} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Fractions'
        >
            {getFieldDecorator('regionalFractions', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Regional Fractions"}],
                }
            )(
                <Input />
            )}
        </FormItem>

    </Form>
}

export default RadiationForm;


export const prepareRadiationInput = values => {
    const {date,
        treatmentAnatomicSite,
        treatmentTechnique,
        regionalModality,
        regionalDose,
        regionalFractions} = values;

    return {
        clinicalTrial: {
            date,
            treatmentAnatomicSite,
            treatmentTechnique,
            regionalModality,
            regionalDose,
            regionalFractions
        }
    }
}

 const propare = () => {

}