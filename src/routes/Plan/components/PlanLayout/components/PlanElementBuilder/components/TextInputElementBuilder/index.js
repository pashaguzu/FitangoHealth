import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import messages from './messages';
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

const TextInputElementBuilder = (props) => {
    const {form, intl,  details={}} = props;
    const {getFieldDecorator} = form;
    const {label=''} = details;
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

            {/*<FormItem {...formTailLayout}>
                {getFieldDecorator('isBlog')(
                    <Checkbox>
                        Use as Blog
                    </Checkbox>
                )}
            </FormItem>*/}
        </React.Fragment>
    );
}

export default injectIntl(TextInputElementBuilder);

export const prepareInput = (values) => {
    const {title, isBlog} = values;

    return {
        textInputElement: {
            title,
            isBlog,
        }
    }
};