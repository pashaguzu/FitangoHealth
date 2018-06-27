import React from 'react';
import {compose, withHandlers} from 'recompose';
import {injectIntl} from 'react-intl';
import {Form, Input, Slider} from 'antd';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
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

const LineElementBuilder = (props) => {
    const {form, intl,  details={}} = props;
    const {getFieldDecorator} = form;
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
                <div style={{marginTop:5}} >
                {getFieldDecorator('color', {
                        initialValue:color,
                        rules: [{required: true, message: "Choose Color"}],
                    }
                )(
                    <ColorPicker animation="slide-up"  enableAlpha={false} />
                )}
                </div>
            </FormItem>
        </React.Fragment>
    );
}

const enhance = compose(
    injectIntl,
    withHandlers({
        onChange: props => ({color}) => {
            console.log(color);
            props.form.setFieldsValue({color:color});
        }
    })
);

export default enhance(LineElementBuilder);


export const prepareInput = (values) => {
    const {height, color:{color}} = values;

    return {
        lineElement: {
            height,
            color,
        }
    }
}