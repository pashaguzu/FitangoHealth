import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {Button,  Form, Icon, Radio, Select, Input} from 'antd';

const {Option} = Select;
const FormItem = Form.Item;
const format = 'h:mm a';
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

//let total;
let uuid2 = 0;

class StageLetters extends React.Component {

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
        uuid2++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
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
        const {loading, cancerLetters, form } = this.props;
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
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');

        uuid2 = keys.length;
        //const letters = getFieldValue('letters');
        //console.log(letters);
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Letters' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`letters[${k}]`, {
                        //validateTrigger: ['onChange', 'onBlur'],
                        initialValue: '',
                        rules: [{
                            required: true,
                            message: "Please select letter or delete this line.",
                        }],
                    })(
                        <Select placeholder="Select Letter" style={{ width: '60%', marginRight: 8 }} >
                            {cancerLetters.map((letter, i) => <Option key={letter.name}>{letter.name}</Option>)}
                        </Select>
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
                        label="Title"
                        required={true}
                    >
                        {getFieldDecorator('title', {
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
                            <Icon type="plus" /> Add Letter
                        </Button>
                    </FormItem>
                </React.Fragment>
        );
    }
}

export default StageLetters;