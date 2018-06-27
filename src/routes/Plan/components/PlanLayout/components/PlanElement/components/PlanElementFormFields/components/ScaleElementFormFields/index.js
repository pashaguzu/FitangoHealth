import React from 'react';
import {Form, Input, Button, Icon, Select} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;


export const prepareInput = (values) => {
    const {scaleId, title} = values;
    let {options} = values;
    options = options.map((option, i) => {
        const id = '';//timesPerHour[i] ? timesPerHour[i]['id'] : '';
        return {id, 'label': option}
    });
    return {
        scaleElement: {
            title:title,
            scaleId:scaleId,
            options:options
        }
    }
}

class ScaleElementFormFields extends React.Component {

    remove = (k) => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    updateOptions = (value) => {
        console.log(value);
        const {scales, form} = this.props;
        const selectedScale = scales.filter(scale => {
            return scale.id === value;
        });
        if (selectedScale.length > 0) {
            const {options} =selectedScale[0];

            form.setFieldsValue({
                options: options,
            });
        }
    }


    componentWillReceiveProps(nextProps) {
        //nextProps.form.setFieldsValue()
    }

    render() {
        const {form, intl, scales=[], formItemLayout, formTailLayout} = this.props;
        const {getFieldDecorator, getFieldValue} = form;

        getFieldDecorator('keys');
        getFieldDecorator('options');
        const keys = getFieldValue('keys', {initialValue:[]});
        const options = getFieldValue('options', {initialValue:[]});
        const optionsFields = keys.map((k, index) => {
            const option = options[index];
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formTailLayout)}
                    label={index === 0 ? 'Options' : ''}
                    required={true}
                    key={k}
                >
                    {getFieldDecorator(`options[${k}]`, {
                        initialValue: (option.label || ''),
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please input option title or delete this field.",
                        }],
                    })(
                        <Input placeholder="Option title" style={{width: '60%', marginRight: 8}}/>
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('title', {
                            rules: [{required: true, message: "Enter Title", whitespace: true}],
                        }
                    )(
                        <Input/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.scale)}
                >
                    {getFieldDecorator('scaleId', {
                            rules: [{required: true, message: "Select Scale", whitespace: true}],
                        }
                    )(
                        <Select onSelect={this.updateOptions}>
                            {scales.map(scale => <Option key={scale.id} value={scale.id}>{scale.name}</Option>)}
                        </Select>
                    )}
                </FormItem>


                {optionsFields}
                <FormItem {...formTailLayout}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> Add Option
                    </Button>
                </FormItem>

            </React.Fragment>
        );
    }
}

export default injectIntl(ScaleElementFormFields);

