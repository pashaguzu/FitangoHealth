import React from 'react';
import {Form, Input} from 'antd';
import {DiagnosisSelect} from "../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import {DateField} from "../../../../../../components/FormCustomFields/index";
import {InputUnits, InputUnitsValidator} from "../../../../../../components/FormCustomFields/components/InputUnits/index";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const RadiologyForm = ({cancer={}, form, formItemLayout}) => {
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
            label='Procedure'
        >
            {getFieldDecorator('procedure', {
                    //initialValue: code,
                    rules: [{required: true, message: "Select Trial"}],
                }
            )(
                <DiagnosisSelect />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Tumorsize'
        >
            {getFieldDecorator('tumorSize', {
                rules: [{validator:InputUnitsValidator, required: true, message: "Enter Tumor size"}],
                }
            )(
                <InputUnits />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Regional Lymph Nodes'
        >
            {getFieldDecorator('regionalLymphNodes', {
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Metastatic Sites'
        >
            {getFieldDecorator('metastaticSites', {
                }
            )(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default RadiologyForm;


export const prepareRadiologyInput = values => {
    const {date,
        procedure,
        tumorSize,
        regionalLymphNodes,
        metastaticSites} = values;

    return {
        clinicalTrial: {
            date,
            procedure,
            tumorSize,
            regionalLymphNodes,
            metastaticSites
        }
    }
}