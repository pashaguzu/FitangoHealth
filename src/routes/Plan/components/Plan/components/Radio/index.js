import React from 'react'
import PropTypes from 'prop-types'

import {Radio} from 'antd';
const RadioGroup = Radio.Group;


const vertStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
export default class PlanRadio extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.reports
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        reportValue: PropTypes.number
    };
    componentWillReceiveProps(nextProps) {

        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(e) {
        e.preventDefault();
        const { value } = e.target;
        // checklist values
        this.setState({value:value});
        this.props.onChange(value, 'checklist');
    }

    render() {
        const {item} = this.props;
        const {value} = this.state;

        const options = item.options;

        let radioStyle = {};
        if (item.isVertically) {
            radioStyle = vertStyle;
        }


        return <RadioGroup onChange={this.onChange} value={value} >
            {options.map((option, i) => {
                const coid = option.value;
                const name = option.label;
                //const description = option.description;
                return <Radio key={i} style={radioStyle} value={coid}>{name}</Radio>;
            })}
        </RadioGroup>
    }
}