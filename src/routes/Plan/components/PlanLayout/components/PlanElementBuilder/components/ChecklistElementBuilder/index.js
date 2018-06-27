import React from 'react';
import {Form, Input, Button, Icon, Checkbox, Tooltip} from 'antd';
import { compose, withHandlers, withState, lifecycle} from 'recompose';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {Options} from "../../../../../../../../components/FormCustomFields/components/Options/index";


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};



export const prepareInput = (values) => {
    console.log(values, 'TODO');
    const {title, schedule, keys=[], ids=[]} = values;
    let {options=[]} = values;
    options = keys.map(i => {
        const id =  ids[i] || '';
        const label = options[i] || '';
        return {id, label}
    });
    //console.log(options);
    return {
        schedule:schedule,
        optionsElement: {
            title,
            options
        }
    }
}



const ChecklistElementBuilder = (props) => {
    const {form, intl, element={}} = props;
    const {getFieldDecorator} = form;
    const {itemInfo={}} = element;
    const {label:title, options = [blankOption] } = itemInfo;
    return (

        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input/>
                )}
            </FormItem>

            <Options form={form} options={options} title="To Do" />

        </React.Fragment>
    );
}

const blankOption = {id:'', title:''};
const enhance = compose(
    injectIntl
);

export default enhance(ChecklistElementBuilder);