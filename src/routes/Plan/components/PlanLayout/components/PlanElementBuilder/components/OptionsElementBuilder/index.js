import React from 'react';
import {Form, Select, Input, Checkbox, Tooltip, Icon} from 'antd';
import { compose, withHandlers, withState} from 'recompose';
import ScaleElementOptions from './options';
import messages from './messages';
import {injectIntl} from 'react-intl';

const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

const OptionsElementBuilder = (props) => {
    console.log(props);
    const {form, loading, intl, scales=[], formItemLayout=formItemLayoutDefault, details={}} = props;
    const {getFieldDecorator, getFieldValue} = form;
    const {label, options=[], isDropdown=false, isMultiple=false, isVertical=false, hasLine=false} = details;
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

            <ScaleElementOptions options={options} form={form} />

            <FormItem {...formTailLayout}>
                {getFieldDecorator('isDropdown', {
                    initialValue: isDropdown,
                    valuePropName: 'checked'
                })(
                    <Checkbox>
                        Show as Dropdown  <Tooltip title="Show options as dropdown">
                        <Icon type="question-circle-o"/>
                    </Tooltip>
                    </Checkbox>
                )}
            </FormItem>
            {!getFieldValue('isDropdown') &&
            <React.Fragment>
                <FormItem {...formTailLayout}>
                    {getFieldDecorator('isMultiple', {
                        initialValue: isMultiple,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>
                            Is Multiple <Tooltip title="Multiple options can be selected">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>

                <FormItem {...formTailLayout}>
                    {getFieldDecorator('isVertical', {
                            initialValue: isVertical,
                            valuePropName: 'checked'
                        }
                    )(
                        <Checkbox>
                            Display Vertically <Tooltip title="Show options vertically">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>
                {getFieldValue('isVertical') &&
                <FormItem {...formTailLayout}>
                    {getFieldDecorator('hasLine', {
                        initialValue: hasLine,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>
                            Add Separation Line <Tooltip title="Add separation Line between options">
                            <Icon type="question-circle-o"/>
                        </Tooltip>
                        </Checkbox>
                    )}
                </FormItem>}
            </React.Fragment>
            }
        </React.Fragment>
    );
};

export default OptionsElementBuilder;


export const prepareInput = (values) => {
    const { title, isDropdown, isMultiple, isVertical, hasLines} = values;
    let { keys,options, ids} = values;
    console.log(keys);
    options = keys.map(i => {
        const id = ids[i] || '';
        const label = options[i] || '';
        return {id, label}
    });

    return {
        optionsElement: {
            title,
            isDropdown,
            isMultiple,
            hasLines,
            isVertical,
            options
        }
    }
}