import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import StageRule from './components/StageRule';

import {Button, Modal, Form, Icon, Radio, Row, TimePicker, Col, Select, Input} from 'antd';

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
let uuid = 0;

class StageLetters extends React.Component {

    /*constructor(props) {
        super(props);

        const stage_keys = props.form.getFieldValue('stage_keys');
        console.log(stage_keys);
        uuid = stage_keys.length;
    }*/

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const stage_keys = form.getFieldValue('stage_keys');
        // We need at least one passenger
        if (stage_keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            stage_keys: stage_keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const stage_keys = form.getFieldValue('stage_keys');
        const nextstage_keys = stage_keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            stage_keys: nextstage_keys,
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

    checkRule = (rule, value, callback) => {
        const letters = this.props.form.getFieldValue('letters');

        if (!value) {
            callback('Enter letters');
        }
        console.log(value);
        /*const {matrix, stage} = value;

        if (stage === '') {

        }
        if (letters.length !== matrix.length) {
            callback('Enter letters');
        }
        //console.log(value);
        /*if (value.number > 0) {
            callback();
            return;
        }*/
        //callback('Price must greater than zero!');
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
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

        //
        //console.log(this.props.form.getFieldsValue());
        getFieldDecorator('stage_keys', { initialValue: [] });
        const stage_keys = getFieldValue('stage_keys');
        uuid = stage_keys.length;
        console.log(stage_keys);
        console.log(uuid);
        const formItems = stage_keys.map((k, index) => {
            const letters = getFieldValue('letters');
            return (
                <FormItem
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`rules[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            message: "Please enter rule",
                            //validator: this.checkRule
                        }],
                    })(
                        <StageRule form={this.props.form} letters={letters}/>
                    )}
                    {stage_keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={stage_keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (

                <React.Fragment>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                            <Icon type="plus" /> Add Stage
                        </Button>
                    </FormItem>
                </React.Fragment>
        );
    }
}

export default StageLetters;