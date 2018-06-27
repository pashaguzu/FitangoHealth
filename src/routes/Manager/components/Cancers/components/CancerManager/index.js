import React from 'react';
import {Form, Input, Select} from 'antd';
import {DiagnosisSelect} from "../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import {CancerStageSelect} from "../../../../../../components/Autosuggest/containers/CancerStageSelect";
import {ChemotherapySelect} from "../../../../../../components/Autosuggest/containers/ChemotherapySelect";

const FormItem = Form.Item;

const CancerManager = ({cancer={}, form, formItemLayout}) => {
    const {getFieldDecorator} = form;
    const {title='', code='', stage={}, chemotherapies=[]} = cancer;
    // console.log(cancer);
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Cancer name",
                }],
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Select Diagnosis'
        >
            {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{required: true, message: "Select Diagnosis"}],
                }
            )(
                <DiagnosisSelect codeAsId />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Select Stage'
        >
            {getFieldDecorator('stageId', {
                    initialValue: stage.id || '',
                    rules: [{required: true, message: "Select Stage"}],
                }
            )(
                <CancerStageSelect />
            )}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label='Chemotherapies'
        >
            {getFieldDecorator('chemotherapyIds', {
                    initialValue: chemotherapies.map(info => info.id),
                    rules: [{required: true, message: "Select Chemotherapy"}],
                }
            )(
                <ChemotherapySelect mode="multiple" />
            )}
        </FormItem>






    </Form>
}

export default CancerManager;