import React from 'react';
import {Form, Input, Select} from 'antd';
import {DiagnosisSelect} from "../../../../../../components/Autosuggest/containers/DiagnosisSelect";
import {CancerStageSelect} from "../../../../../../components/Autosuggest/containers/CancerStageSelect";
import {ChemotherapySelect} from "../../../../../../components/Autosuggest/containers/ChemotherapySelect";

const FormItem = Form.Item;

const CancerManager = ({chemotherapy={}, form, formItemLayout}) => {
    const {getFieldDecorator} = form;
    const {title=''} = chemotherapy;
    //console.log(chemotherapy);
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Chemotherapy name",
                }],
            })(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default CancerManager;