import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import messages from './messages';
import PlanSelect from "../../../../../../../../components/Autosuggest/containers/PlanSelect";
const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const ApElementBuilder = (props) => {
    const {form, intl,  details={}} = props;
    const {getFieldDecorator} = form;
    console.log(props);
    const {id:planId=''} = details;
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('planId', {
                        initialValue:planId,
                        rules: [{required: true, message: "Select ActionPlan"}],
                    }
                )(
                    <PlanSelect />
                )}
            </FormItem>
        </React.Fragment>
    );
}

export default injectIntl(ApElementBuilder);

export const prepareInput = (values) => {
    const {planId} = values;

    return {
        apElement: planId
    }
}