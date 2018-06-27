import React from 'react';
import {Form, Input} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;


export const prepareInput = (values) => {
    const {title} = values;

    return {
        fileInputElement: {
            title:title,
        }
    }
}

class FileInputElementFormFields extends React.Component {

    static defaultProps = {
        details:{}
    }

    render() {
        const {form, intl, formItemLayout, details} = this.props;
        const {getFieldDecorator} = form;
        const {label} = details
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
                        <Input/>
                    )}
                </FormItem>

            </React.Fragment>
        );
    }
}

export default injectIntl(FileInputElementFormFields);

