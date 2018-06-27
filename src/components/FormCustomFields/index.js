import React from 'react';
import PropTypes from 'prop-types';
import {compose, withHandlers, withState, defaultProps} from 'recompose';
import { DatePicker, Input,Col,Select,Form, TimePicker } from 'antd';
import {
    injectIntl,
    defineMessages,
    FormattedMessage
} from 'react-intl';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import moment from "moment/moment";
import {connect} from "react-redux";

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 6,
        },
    },
};


export class StartEndFormInit extends React.Component{


    static propTypes = {
        names:PropTypes.shape({
            startDate: PropTypes.string,
            endDate: PropTypes.string
        }),
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        dateFormat: PropTypes.string,
        form: PropTypes.object.isRequired,
        endDateRequired: PropTypes.bool,
        inline: PropTypes.bool,
    }

    static defaultProps = {
        names: {
            startDate: 'startDate',
            endDate: 'endDate',
        },
        startDate: null,
        endDate: null,
        endDateRequired: false,
        inline: true,
        formItemLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
    }


    checkEndDate = (rule, value, callback) => {
        const form = this.props.form;
        //callback();

        const start_date = form.getFieldValue(this.props.names.startDate);


        if (start_date && value && value < start_date) {

            callback('End date is wrong');
        } else {
            callback();
        }
    }

    disabledStartDate = (endValue) => {
        console.log(endValue);
        if (endValue) {
            const form = this.props.form;
            //callback();
            const startValue = form.getFieldValue(this.props.names.endDate);
            //const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() > startValue.valueOf();
        }
        return false;
    }
    disabledEndDate = (endValue) => {
        if (endValue) {
            const form = this.props.form;
            //callback();


            const startValue = form.getFieldValue(this.props.names.startDate);
            //console.log(endValue);
            //console.log(startValue);
            //const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() <= startValue.valueOf();
        }
    }


    render(){

        const {  form, intl, endDateRequired, startDate, endDate, inline, names } = this.props;
        let {formItemLayout} = this.props;

        const {getFieldDecorator} = form;

        if (inline) {
            formItemLayout = {};
        }
        //console.log(names);
        //console.log(startDate ? moment(startDate) : moment());

        const startField = <FormItem
            {...formItemLayout}
            label={!inline && 'Start Date'}
        >
            {getFieldDecorator(names.startDate, {
                initialValue: startDate ? moment(startDate) : moment(),
                rules: [{
                    type: 'object', required: true, message: 'Please Select',
                }],
            })(
                <DateField
                    allowClear={false}
                    placeholder="Start date"
                    disabledDate={this.disabledStartDate}
                />
            )}
        </FormItem>;


        const endfield =  <FormItem
            {...formItemLayout}
            label={!inline && 'End Date'}
        >
            {getFieldDecorator(names.endDate, {
                initialValue: endDate ? moment(endDate) : undefined,
                rules: [{
                    type: 'object', required: endDateRequired, validator: this.checkEndDate, message: 'End date must be after Start Date',
                }],
            })(

                <DateField
                    placeholder="End date"
                    allowClear={!endDateRequired}
                    disabledDate={this.disabledEndDate}
                />
            )}
        </FormItem>;


        if (inline) {
            // if it's inline
            return (
                <React.Fragment>
                    <Col span={11}>
                        {startField}

                    </Col>
                    <Col span={2}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                      -
                    </span>
                    </Col>
                    <Col span={11}>
                        {endfield}

                    </Col>
                </React.Fragment>
            );
        } else {
            // in as separate field
            return (
                <React.Fragment>
                    {startField}

                    {endfield}
                </React.Fragment>
            );
        }
    }
}


const mapStateToProps = (state) => {
    return {
        dateFormat: state.user.info.dateFormat
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export const StartEndForm = injectIntl(StartEndFormInit);





class DateFieldInit extends React.Component{

    constructor(props) {
        super(props);

        const value = this.props.value || undefined;
        //console.log(props);
        this.state = {
            date: value
        };
    }

    static propTypes = {
        disabledDate: PropTypes.func,
        allowClear: PropTypes.bool,
        dateFormat: PropTypes.string,
        placeholder: PropTypes.string,
    }

    static defaultProps = {
        allowClear: true,
        placeholder: 'Select Date',
        disabledDate: () => {
            return false;
        },
        formItemLayout: {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        // Should be a controlled component.
        if ('value' in nextProps) {
            const date = nextProps.value || undefined;
            this.setState({date});
        }
    }

    onChange = (date) => {
        //console.log(date);

        if (!('value' in this.props)) {
            this.setState({ date });
        }
        this.triggerChange({ date });
    }

    triggerChange = (changedValue) => {
        // Should provide an event to pass value to Form.
        const onChange = this.props.onChange;
        if (onChange) {
            //console.log(Object.assign({}, this.state, changedValue.date));
            const formattedDate = changedValue.date;
            //const formattedDate = moment(date).format('YYYY-MM-DD');
            //console.log(this.state);
            //console.log(Object.assign({}, this.state, changedValue));
            onChange(formattedDate);
            //const newValue = Object.assign({}, this.state, changedValue);
            this.setState(changedValue);
            //onChange(Object.assign({}, this.state, changedValue));
        }
    }

    render(){

        const {disabledDate, placeholder, dateFormat, allowClear } = this.props;
        //console.log(this.state);
        return <DatePicker
             placeholder={placeholder}
             format={dateFormat}
             disabledDate={disabledDate}
             allowClear={allowClear}
             onChange={this.onChange}
             value={this.state.date}
         />
    }
}


export const DateField = connect(
    mapStateToProps,
    mapDispatchToProps
)(DateFieldInit);


export const TimeFieldPure = props => {
    const {time=undefined,allowClear=true, disabled=false, placeholder='', onChange} = props;
    return <TimePicker use12Hours value={time}  format="h:mm a" onChange={onChange} allowEmpty={allowClear} disabled={disabled} placeholder={placeholder} />;
}

export const TimeField = compose(
    withState('time', 'setTime', props => props.value),
    withHandlers({
        onChange: props => (time) => {
            // if (!('value' in this.props)) {
            //     this.setState({ time });
            // }
            //console.log(props);
            //console.log(time);
            props.onChange(time);
            //console.log(time);
            props.setTime(time);

        }
    }),
)(TimeFieldPure);


     const StartEndTimePure = props => {

        const {  form, intl, endTimeRequired=false, startDate, endDate, startTime, endTime, inline, names } = props;
        let {formItemLayout} = props;

        const {getFieldDecorator} = form;

        if (inline) {
            formItemLayout = {};
        }
        //console.log(names);
        //console.log(startDate ? moment(startDate) : moment());
        // console.log(startTime);
        // console.log(endTime);
        // console.log(startDate);
        // console.log(moment(startDate+' '+startTime));
        const startField = <FormItem
            {...formItemLayout}
            label={!inline && 'Start Time'}
        >
            {getFieldDecorator(names.startTime, {
                initialValue: startTime ? moment(startTime) : moment(),
                rules: [{
                    type: 'object', required: true, message: 'Please Select',
                }],
            })(
                <TimeField
                    allowClear={false}
                    placeholder="Start Time"
                />
            )}
        </FormItem>;


        const endfield =  <FormItem
            {...formItemLayout}
            label={!inline && 'End Time'}
        >
            {getFieldDecorator(names.endTime, {
                initialValue: endTime ? moment(endTime) : undefined,
                rules: [{
                    type: 'object', required: endTimeRequired, validator: props.checkEndTime, message: 'End time must be later Start time',
                }],
            })(

                <TimeField
                    placeholder="End Time"
                    allowClear={!endTimeRequired}
                />
            )}
        </FormItem>;


        if (inline) {
            // if it's inline
            return (
                <React.Fragment>
                    <Col span={10}>
                        {startField}
                    </Col>
                    <Col span={2}>
                    <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
                      -
                    </span>
                    </Col>
                    <Col span={10}>
                        {endfield}

                    </Col>
                </React.Fragment>
            );
        } else {
            // in as separate field
            return (
                <React.Fragment>
                    {startField}

                    {endfield}
                </React.Fragment>
            );
        }
    }

    const enhance = compose(
        defaultProps({
            names: {
                startTime: 'startTime',
                endTime: 'endTime',
            },
            startTime: null,
            endTime: null,
            endTimeRequired: false,
            inline: true,
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 14 },
                },
            }
        }),
        injectIntl,
        withHandlers({
            checkEndTime: props => (rule, value, callback) => {
                    const form = props.form;
                    //callback();

                    const start_time = form.getFieldValue(props.names.startTime);

                    // console.log(start_time);
                    // console.log(value);
                    // console.log(rule);
                    if (start_time && value && value < start_time) {
                        callback('End time is wrong');
                    } else {
                        callback();
                    }

                // console.log(props);
                // console.log(value);
            }
        })
    )
export const StartEndTime = enhance(StartEndTimePure);
