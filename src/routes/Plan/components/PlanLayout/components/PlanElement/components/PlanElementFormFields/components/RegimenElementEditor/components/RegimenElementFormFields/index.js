import React from 'react';
import {Form, Input} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;


class RegimenElementFormFields extends React.Component {

    render() {
        const {form, intl, formItemLayout} = this.props;
        const {getFieldDecorator} = form;

        return (
            <React.Fragment>
                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.title)}
                    >
                        {getFieldDecorator('text', {
                                rules: [{required: true, message: "Select Plan", whitespace: true}],
                            }
                        )(
                            <Input />
                        )}
                    </FormItem>
            </React.Fragment>
        );
    }
}

export default injectIntl(RegimenElementFormFields);

