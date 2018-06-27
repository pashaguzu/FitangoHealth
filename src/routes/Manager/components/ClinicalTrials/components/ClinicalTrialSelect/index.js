import React from 'react';
import ClinicalTrialSelect from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import {Form} from 'antd';
const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};

export const ClinicalTrial = props => {
    //console.log(props);
    const {form, intl, formItemLayout=formItemLayoutDefault, details={}} = props;
    const {getFieldDecorator} = form;
    const {details:clinicalDetails={}} = details;
    const {id} = clinicalDetails;

    return <FormItem
        {...formItemLayout}
        label={'Clinical Trial'}
    >
        {getFieldDecorator('clinicalTrialId', {
                initialValue:id,
                rules: [{required: true, message: "Select Clinical Trial", whitespace: true}],
            }
        )(
            <ClinicalTrialSelect />
        )}
    </FormItem>;
}

export default ClinicalTrial;

export const prepareInput = (values) => {
    const {clinicalTrialId} = values;

    return {
        clinicalTrialElement: {
            clinicalTrialId
        }
    }
};