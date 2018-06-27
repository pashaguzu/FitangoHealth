import React from 'react';
import {Form, Input, Divider} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const PlanElementAdditions = props => {
    console.log(props);
    const {form, intl, formItemLayout=formItemLayoutDefault, mode, element={}}  = props;
    const {getFieldDecorator} = form;
    if (mode !== 'pathway') {
        return null;
    }
    const {footnote='', reference=''} = element;

    return <React.Fragment>
        <Divider>Additional</Divider>
        <FormItem
            {...formItemLayout}
            label={intl.formatMessage(messages.footnote)}
        >
            {getFieldDecorator('extra[footnote]', {
                    initialValue:footnote,
                }
            )(
                <Input.TextArea autosize={{ minRows: 1, maxRows: 6 }} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label={intl.formatMessage(messages.reference)}
        >
            {getFieldDecorator('extra[reference]', {
                    initialValue:reference,
                }
            )(
                <Input.TextArea autosize={{ minRows: 1, maxRows: 6 }} />
            )}
        </FormItem>
    </React.Fragment>
}

export default injectIntl(PlanElementAdditions);