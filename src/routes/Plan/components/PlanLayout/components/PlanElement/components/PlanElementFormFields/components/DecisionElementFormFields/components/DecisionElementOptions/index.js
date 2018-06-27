import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {Button,  Form, Icon, Input} from 'antd';

const FormItem = Form.Item;

//let total;
let uuid2 = 0;

export default class DecisionElementOptions extends React.Component {


    constructor(props) {
        super(props);
        const {form, details={}} = this.props;
        const {options = [{value:'', label:''}]} = details;
        const keys = options.length > 0 ?  Object.keys(options) : [0];
        uuid2 = options.length;
        //console.log(options);
        form.getFieldDecorator('keys', {initialValue: keys});
        options.map((option, i) => {
            //form.getFieldDecorator(`options[${i}]`, {initialValue: option.label});
            form.getFieldDecorator(`ids[${i}]`, {initialValue: option.value});
            return false;//option.value;
        });

        this.state = {
            open:false,
        }
        //form.getFieldDecorator('options[0]', {initialValue:['']});
        //form.getFieldDecorator('ids[0]', {initialValue:['']});

    }

    static defaultProps = {
        cancerLetters: []
    }

    remove = (k) => {
        const { form } = this.props;
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
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid2);
        //const nextIds = keys.concat('fake'+uuid2);
        uuid2++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
            //ids:nextIds
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        console.log(this.props);
        const {loading, cancerLetters, form, details={} } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        //console.log(cancerLetters);
        getFieldDecorator('keys');
        const keys = getFieldValue('keys');

        uuid2 = keys.length;
        const {label='', options=[]} = details;
        //const letters = getFieldValue('letters');
        //console.log(letters);
        const formItems = keys.map((k, index) => {
            const option = options[k] || {};
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Options' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`options[${k}]`, {
                        //validateTrigger: ['onChange', 'onBlur'],
                        initialValue: option.label || '',
                        rules: [{
                            required: true,
                            message: "Please enter option or delete this line.",
                        }],
                    })(
                        <Input addonAfter={keys.length > 1 ? (
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(k)}
                            />
                        ) : null} />
                    )}

                </FormItem>
            );
        });
        return (

            <React.Fragment>
                <FormItem
                    {...formItemLayout}
                    label="Title"
                    required={true}
                >
                    {getFieldDecorator('title', {
                        initialValue: label,
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please enter title.",
                        }],
                    })(
                        <Input placeholder="Title"  />
                    )}
                </FormItem>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add Option
                    </Button>
                </FormItem>
                {keys.length > 0 &&
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" onClick={this.props.next} style={{width: '60%'}}>
                        <Icon type="plus"/> Next
                    </Button>
                </FormItem>
                }
            </React.Fragment>
        );
    }
}