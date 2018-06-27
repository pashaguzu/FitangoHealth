import React from 'react'
import PropTypes from 'prop-types'
import {Select} from 'antd';
import './index.less';
const Option = Select.Option;

export default class ConditionElement extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.reports
        };
    };
    static propTypes = {
        reportValue: PropTypes.number
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange = (value) => {
        this.setState({value:value});
        this.props.onChange(value, 'dropdown');
        if (1===1 || this.props.hasChildren) {
            // if we have children, then load according to value
            this.loadChildren(value);
        }
    }

    loadChildren = (value) => {
        this.props.showChildren(value);
    }

    render() {
        const {item, hasChildren} = this.props;
        let {value} = this.state;
        value = value !== '' ? value : null;
        const options = item.options;
        return <Select
            showSearch
            allowClear={true}
            style={{ width: '100%' }}
            placeholder={'Select '+item.label}
            optionFilterProp="name"
            value={value}
            onChange={this.onChange}
            /*
            onFocus={handleFocus}
            onBlur={handleBlur}*/
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {options.map((option, i) => {
                const coid = option.value;
                const name = option.label;
                //const description = option.description;
                return <Option key={i} value={coid}>{name}</Option>;
            })}
        </Select>
    }
}