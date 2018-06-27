import React from 'react';
import {Form, Select} from 'antd';
import messages from './messages';

const Option = Select.Option;
const FormItem = Form.Item;


export const prepareInput = (values) => {
    const {assessmentId} = values;

    return {
        assessmentElement: {
            assessmentId,
        }
    }
}

const AssessmentElementBuilder = (props) => {
    const {form, loading, intl, assessments=[], formItemLayout, details={}} = props;
    const {getFieldDecorator} = form;
    const {id=''} = details;
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.assessment)}
            >
                {getFieldDecorator('assessmentId', {
                        initialValue:id,
                        rules: [{required: true, message: "Select Assessment"}],
                    }
                )(
                    <Select placeholder={loading? 'Loading Assessments' : 'Select'} style={{width:'100%'}}>
                        {assessments.map(assessment => <Option key={assessment.id} >{assessment.name}</Option>)}
                    </Select>
                )}
            </FormItem>
        </React.Fragment>
    );
};


export default AssessmentElementBuilder;
