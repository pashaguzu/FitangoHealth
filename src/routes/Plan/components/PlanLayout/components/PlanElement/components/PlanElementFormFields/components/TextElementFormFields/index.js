import React from 'react';
import {Input, Form} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';
import TextElementTipIcons from './containers/TextElementTipIcons';
import './index.less';

const { TextArea } = Input;
const FormItem = Form.Item;

export const prepareInput = (values) => {
    const {text, icon} = values;

    return {
        textElement: {
            text,
            icon
        }
    }
}

class TextElementFormFields extends React.Component {

    static defaultProps = {
        tip:false,
        embed:false,
        isWysiwyg:true,
        details:{}
    }

    render() {
        const {form, intl, embed, tip, details, formItemLayout} = this.props;
        const {getFieldDecorator} = form;
        const {text='', icon=''} = details;
        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(embed ? messages.embed : messages.title)}
                >
                    {getFieldDecorator('text', {
                            initialValue:text,
                            rules: [{required: true, message: "Enter Text", whitespace: true}],
                        }
                    )(
                        embed ? <TextArea/> :  <TextArea />
                    )}
                </FormItem>

                {tip &&
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.toolpic)}
                >
                    {getFieldDecorator('icon', {
                            initialValue:icon,
                            rules: [{required: true, message: "Select Icon"}],
                        }
                    )(
                        <TextElementTipIcons />
                    )}
                </FormItem>
                }
            </React.Fragment>
        );
    }
}

export default injectIntl(TextElementFormFields);

