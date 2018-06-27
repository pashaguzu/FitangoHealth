import React from 'react'
import moment from 'moment';
import {FormattedDate} from 'react-intl';
import { withRouter } from 'react-router-dom'
import { Card, Modal,Form ,Popover, Radio, DatePicker} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '33px',
};

class GetPlanstorePlan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            confirmLoading: false,
        };
        this.checkEndDate = this.checkEndDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };


    disabledStartDate = (endValue) => {
        const form = this.props.form;
        //callback();

        const startValue = form.getFieldValue('endDate');
        //const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() > startValue.valueOf();
    }
    disabledEndDate = (endValue) => {
        const form = this.props.form;
        //callback();

        const startValue = form.getFieldValue('startDate');
        //const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }


    checkEndDate = (rule, value, callback) => {
        const form = this.props.form;
        //callback();

        const start_date = form.getFieldValue('startDate');
        if (start_date && value && value < start_date) {
            callback('End date is wrong');
        } else {
            callback();
        }
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const { getPlanstorePlan, form, history, plan } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });

                const {startDate, endDate, privacy, end_date_set} = values;
                let input = {};
                if (!plan.isFixedDated) {
                    const startDateYMD = startDate.format("YYYY-MM-DD");
                    const endDateYMD = end_date_set ? endDate.format("YYYY-MM-DD") : '';
                    input = {startDate: startDateYMD, privacy:privacy, endDate:endDateYMD};
                } else {
                    input = {privacy:privacy, startDate: plan.start_date};
                }

                return getPlanstorePlan(input).then(({data}) => {

                    const upid = data.getPlan.id;
                    this.setState({
                        loading: false
                    });
                    history.push('/plan/'+upid)
                }).catch(() => {

                });
            }
        });
    };

    render () {
        const { visible, confirmLoading, onCancel, form, plan, dateFormat } = this.props;
        const { getFieldDecorator, getFieldValue } = form;

        let endDateError = form.getFieldError('endDate');
        endDateError = endDateError || form.getFieldError('end_date_set');
        return (
            <Modal
                title={'Set your ActionPlan: ' + plan.title}
                visible={visible}
                confirmLoading={confirmLoading}
                onCancel={onCancel} onOk={this.handleSubmit}>
                <Form >
                    <Card title="Privacy" type="inner">
                        <FormItem
                            {...formItemLayout}
                            label="Privacy"
                        >
                            {getFieldDecorator('privacy', {
                                rules: [{
                                    required: true, message: 'Please Select',
                                }],
                            })(
                                <RadioGroup>
                                    <Popover content="Visible to all team members">
                                        <RadioButton value="open">Open
                                        </RadioButton>
                                    </Popover>
                                    <Popover content="Visible to only you">
                                        <RadioButton value="private">Private</RadioButton>
                                    </Popover>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Card>

                    {plan.isFixedDated ? <Card title="Scheduling" type="inner">
                            <FormItem
                                {...formItemLayout}
                                style={{marginBottom:0}}
                                label="Start Date"
                            >
                                <span className="ant-form-text"><FormattedDate value={plan.start_date} year='numeric'
                                                                               month='long'
                                                                               day='numeric'
                                                                               weekday='long' /></span>
                            </FormItem>

                            {plan.end_date !== '' &&
                            <FormItem
                                {...formItemLayout}
                                style={{marginBottom:0}}
                                label="End Date"
                            >
                                <span className="ant-form-text"><FormattedDate value={plan.end_date} year='numeric'
                                                                               month='long'
                                                                               day='numeric'
                                                                               weekday='long' /></span>
                            </FormItem>}
                        </Card> :
                        <Card title="Scheduling" type="inner">
                            <FormItem
                                {...formItemLayout}
                                label="Start Date"
                            >
                                {getFieldDecorator('startDate', {
                                    initialValue: moment(),
                                    rules: [{
                                        required: true, message: 'Please Select Start Date',
                                    }],
                                })(
                                    <DatePicker disabledDate={this.disabledStartDate} allowClear={false}
                                                format={dateFormat}/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="End Date"
                                validateStatus={endDateError ? 'error' : ''}
                                help={endDateError || ''}
                            >
                                {getFieldDecorator('end_date_set', {
                                    rules: [{
                                        required: true, message: 'Please Select End Date',
                                    }],
                                })(
                                    <RadioGroup>
                                        <Radio style={radioStyle} value={false}>Never</Radio>
                                        <Radio style={radioStyle} value={true}>
                                            On  {getFieldValue('end_date_set') === true &&

                                            getFieldDecorator('endDate', {
                                                rules: [{required: true,  message: 'Select End Date'},{
                                                    validator: this.checkEndDate,
                                                    message: 'End date must be after Start Date',
                                                }],
                                            })(
                                                <DatePicker disabledDate={this.disabledEndDate} format={dateFormat} style={{marginLeft:10}}/>
                                            )}
                                        </Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Card>
                    }
                </Form>
            </Modal>
        );
    }
}

const WrappedEditMedicationForm = Form.create()(GetPlanstorePlan);
export default withRouter(WrappedEditMedicationForm);