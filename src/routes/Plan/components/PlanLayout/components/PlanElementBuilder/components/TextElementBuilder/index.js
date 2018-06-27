import React from 'react';
import {injectIntl} from 'react-intl';
import {Form, Input} from 'antd';
import {Wyisiwyg} from "../../../../../../../../components/FormCustomFields/components/Wysiwyg/index";
import messages from './messages';
import {Wysiwyg} from "../../../../../../../../components/FormCustomFields/components/Wysiwyg/index";


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

const TextElementBuilder = (props) => {
    console.log(props);
    const {form, intl,  details={}, editorState} = props;
    const {getFieldDecorator} = form;
    const {text=''} = details;
    return (
        <React.Fragment>
            <FormItem
                /*{...formItemLayout}
              label={intl.formatMessage(messages.title)}*/
            >
                {getFieldDecorator('text', {
                        initialValue:text,
                        rules: [{required: true, message: "Enter Text", whitespace: true}],
                    }
                )(
                    <Wysiwyg />

                )}

            </FormItem>
        </React.Fragment>
    );
}



export default injectIntl((TextElementBuilder));

export const prepareInput = (values) => {
    const {text, icon} = values;
    //console.log(values);
    return {
        textElement: {
            text,
            icon
        }
    }
}