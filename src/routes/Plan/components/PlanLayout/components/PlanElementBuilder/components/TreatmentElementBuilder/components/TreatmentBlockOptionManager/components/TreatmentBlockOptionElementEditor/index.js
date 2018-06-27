import React from 'react';
import {Form, Input} from 'antd';

const FormItem = Form.Item;

export const prepareInput = (values) => {
    const {text, notes} = values;

    return {
        //defaultElement: text
        description: text,
        notes:notes
    }
};

export const TreatmentBlockElementEditorPure = (props) => {
    const {form, details={}, formItemLayout={}, type=''} = props;
    const {getFieldDecorator} = form;
    const {description=''} = details;

    return (
        <FormItem
            {...formItemLayout}
            label={props.getTypeName(type)}
        >
            {getFieldDecorator('text', {
                initialValue:description,
                rules: [{required: true, message: "Enter Text", whitespace: true}],
            })(
                <Input />
            )}
        </FormItem>
    );
};

export default TreatmentBlockElementEditorPure;