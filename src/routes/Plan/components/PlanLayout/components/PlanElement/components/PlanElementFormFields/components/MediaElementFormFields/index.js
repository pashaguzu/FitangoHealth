import React from 'react';
import {Form} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

export const prepareInput = (values) => {
    const {capture} = values;

    return {
        mediaElement: {
            capture,
        }
    }
}


class MediaElementFormFields extends React.Component {

    render() {
        const {form, intl, formItemLayout} = this.props;
        const {getFieldDecorator} = form;

        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('capture', {
                            rules: [{required: true, message: "Enter Capture", whitespace: true}],
                        }
                    )(
                        <div>Media</div>
                    )}
                </FormItem>
            </React.Fragment>
        );
    }
}

export default injectIntl(MediaElementFormFields);

