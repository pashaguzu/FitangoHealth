import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import {Form, Icon, Radio, Row, TimePicker, Col, Select, Input} from 'antd';

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
class StageRule extends React.Component {

    constructor(props) {
        super(props);

        const value = this.props.value || {};
        const options =  value.options || [];//value.number || 0,

        this.state = {
            options,
            stage: value.stage || ''
            //currency: value.currency || 'rmb',
        };
    }

    componentWillReceiveProps(nextProps) {
        // Should be a controlled component.
        console.log(nextProps);
        if ('value' in nextProps) {
            const value = nextProps.value;

            this.setState(value);
        }
    }

    handleStageChange = (e) => {
        const stage = e.target.value;

        if (!('value' in this.props)) {
            this.setState({ stage });
        }
        this.triggerChange({ stage });
    }

    handleMatrixChange = (i, value) => {

        let options = this.state.options;
        options[i] = value;
        if (!('value' in this.props)) {
            this.setState({ options });
        }
        this.triggerChange({ options });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render() {

        const state = this.state;
        //const { letters=[]} = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        //console.log(state.options);
        //console.log(this.props.form.getFieldsValue());
        const {letters=[]} = this.props;
        console.log(letters);
        //const letters = ['T','N','M'];//getFieldValue('letters');
        const span = Math.floor(24/(letters.length+1));
        //console.log(state.options);
        const cols = letters.map((letter, i) => {
            return <Col span={span} key={i}><Input placeholder={letter} value={state.options[i] || ''} onChange={(e) => this.handleMatrixChange(i, e.target.value)} /></Col>;
        })
        return (
            <Row gutter={4} style={{ width: '60%', marginRight: 8 }}>
                 <Col span={span}><Input placeholder="Stage" value={state.stage} onChange={this.handleStageChange} /></Col>
                {cols}
            </Row>
        );
    }
}

export default StageRule;