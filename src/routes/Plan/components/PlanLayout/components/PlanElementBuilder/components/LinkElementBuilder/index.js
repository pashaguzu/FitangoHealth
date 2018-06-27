import React from 'react';
import {injectIntl} from 'react-intl';
import {compose, withHandlers, withState} from 'recompose';
import {Form, Input, Radio} from 'antd';
import messages from './messages';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const LinkElementBuilder = (props) => {
    const {form, intl,  details={}, showUrl=true} = props;
    const {getFieldDecorator} = form;
    const {label='', url='', description=''} = details;
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('label', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.description)}
            >
                {getFieldDecorator('description', {
                        initialValue:description,
                        rules: [{message: "Enter Description", whitespace: true}],
                    }
                )(
                    <TextArea autosize={{ minRows: 2}} />
                )}
            </FormItem>

            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.url)}
                extra="Ex: https://abc.com"
            >
                {getFieldDecorator('url', {
                        initialValue:url,
                        rules: [{type: 'url', required: true, message: "Enter Url, starting with http:// or https://", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>

        </React.Fragment>
    );
}

const enhance = compose(
    injectIntl,
    withState('showUrl', 'setShowUrl', false),
    withHandlers({
        onHTTPChange: props => (e) => {
            props.setShowUrl(true);
            //console.log(prefix);

            //let url =  props.form.getFieldValue('url');
            //console.log(e.target.value);
            props.form.setFieldsValue({url: e.target.value})
        }
    })
);
export default enhance(LinkElementBuilder);

export const prepareInput = (values) => {
    const {label, url, description} = values;

    return {
        linkElement: {
            label,
            url,
            description,
        }
    }
}