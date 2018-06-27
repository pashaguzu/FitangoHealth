import React from 'react'

import {Checkbox, Card} from 'antd';
const CheckboxGroup = Checkbox.Group;


const vertStyle = {
    display: 'block',
    /*height: '30px',*/
    //lineHeight: '30px',
    marginLeft: 0,
};
export default class PlanChecklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.reports
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        //reportValue: PropTypes.array
    };

    static defaultProps = {
        isPreview:false
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(value) {
        if (this.props.isPreview || this.props.isBuilderMode) {
            return true;
        }
        // checklist values
        this.setState({value:value});
        if (this.props.onChange) {
            this.props.onChange(value, 'checklist');
        } else if (this.props.handleReport) {
            this.props.handleReport(value, 'checklist');
        }


    }

    render() {

        const {item, isBuilderMode, simple=false} = this.props;
        const {value} = this.state;
        //const {label} = item;


        let radioStyle = {};
        if (!simple && item.isVertical) {
            radioStyle = vertStyle;
        }
        var options = item.options;
        let plainOptions = [];
        options.map((option) => {
            const coid = option.value;
            const name = option.label;

            plainOptions.push(<Checkbox key={coid} value={coid} style={radioStyle} >{name}</Checkbox>);
            return option;
        });


        return <CheckboxGroup value={value} onChange={this.onChange} >{plainOptions}</CheckboxGroup>
    }
}
