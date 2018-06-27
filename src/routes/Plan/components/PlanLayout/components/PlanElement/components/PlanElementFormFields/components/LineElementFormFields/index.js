import React from 'react';
import {Slider, Form} from 'antd';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import {injectIntl} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;


export const prepareInput = (values) => {
    const {height, color} = values;

    return {
        lineElement: {
            height,
            color,
        }
    }
}


class LineElementEditor extends React.Component {

    static defaultProps = {
        details:{}
    }

    onChange = ({color}) => {
        this.props.form.setFieldsValue({color:color});
    };

    render() {
        const {form, intl, formItemLayout, details} = this.props;
        const {getFieldDecorator} = form;
        //console.log(this.props);
        const {height, color} = details;
        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.height)}
                >
                    {getFieldDecorator('height', {
                            initialValue:height,
                            rules: [{required: true, message: "Select Height"}],
                        }
                    )(
                        <Slider min={1} max={20} tipFormatter={value => `${value}pt`}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.color)}
                >
                    {getFieldDecorator('color', {
                            initialValue:color,
                            rules: [{required: true, message: "Choose Color"}],
                        }
                    )(
                        <div style={{marginTop:5}}><ColorPicker animation="slide-up" onChange={this.onChange} enableAlpha={false} /></div>
                    )}
                </FormItem>
            </React.Fragment>
        );
    }
}

export default injectIntl(LineElementEditor);

