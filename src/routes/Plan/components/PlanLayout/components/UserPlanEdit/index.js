/**
 * Created by Pavel on 21.12.2017.
 */
import React from 'react';
import {Modal, DatePicker, Form ,Spin, Col, Radio, Popover } from 'antd';
import moment from "moment/moment";
import {FormattedDate} from 'react-intl';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class UserPlanEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {confirmLoading:false}
        this.checkEndDate = this.checkEndDate.bind(this);
    };

    checkEndDate = (rule, value, callback) => {
        const form = this.props.form;
        //callback();

        const start_date = form.getFieldValue('startDate');

        if (start_date && value && value < start_date) {

            callback('End date is wrong');
        } else {
            callback();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { updateUserPlan, onCancel, plan, info } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const{privacy, startDate, endDate } = values;

                let startDateYMD = '';
                let endDateYMD = '';
                if (!plan.isFixedDated) {
                     startDateYMD = startDate.format("YYYY-MM-DD");
                     endDateYMD = endDate ? endDate.format("YYYY-MM-DD") : '';
                } else {
                     startDateYMD = info.startDate;
                     endDateYMD = info.endDate;
                }

                const input = {
                    privacy,
                    startDate:startDateYMD,
                    endDate:endDateYMD
                }

                this.setState({confirmLoading:true});

                return updateUserPlan(input).then((data) => {
                    //message.success('Saved');
                    this.setState({confirmLoading:false});
                    onCancel();
                })
            }
        });

    }

    render() {
        const { loading, plan, info, dateFormat } = this.props;
        const { getFieldDecorator } = this.props.form;

        if (loading) {
            return   <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height:150, textAlign:'center', lineHeight:5}}
            >
                <Spin tip="Loading..." />
            </Modal>
        }

        const {startDate, endDate} = info


        return (
            <Modal
                visible={true}
                destroyOnClose
                maskClosable = {false}
                keyboard = {false}
                okText="Save"
                onCancel={this.props.onCancel}
                title={this.props.title}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleSubmit}
            >
            <Form>

                <FormItem
                    {...formItemLayout}
                    label="Privacy"
                >
                    {getFieldDecorator('privacy', {
                        initialValue: info.privacy,
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <RadioGroup>
                            <Popover content="Visible to anyone">
                                <RadioButton value="open">Open
                                </RadioButton>
                            </Popover>
                            <Popover content="Visible to you">
                                <RadioButton value="private">Private</RadioButton>
                            </Popover>
                        </RadioGroup>
                    )}

                </FormItem>
                {!plan.isFixedDated ?
                <FormItem
                    {...formItemLayout}
                    label={'Period'}
                >
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('startDate', {
                                initialValue: startDate ? moment(startDate) : moment(),
                                rules: [{
                                    required: true, message: 'Please Select Start Date',
                                }],
                            })(
                                <DatePicker
                                    /*disabledDate={this.disabledStartDate}*/
                                    format={dateFormat}
                                    placeholder="Start date"
                                    allowClear={false}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                      -
                    </span>
                    </Col>
                    <Col span={11}>
                        <FormItem
                        >
                            {getFieldDecorator('endDate', {
                                initialValue: endDate ? moment(endDate) : undefined,
                                rules: [{
                                    validator: this.checkEndDate, message: 'End date must be after Start Date',
                                }],
                            })(
                                <DatePicker
                                    placeholder="End date"
                                    format={dateFormat}

                                    /*disabledDate={this.disabledEndDate}

                                    placeholder="End"*/
                                />
                            )}
                        </FormItem>
                    </Col>
                </FormItem>
                    :
                <div>
                    <FormItem
                    {...formItemLayout}
                    style={{marginBottom:0}}
                    label="Start Date"
                >
                                <span className="ant-form-text"><FormattedDate value={startDate} year='numeric'
                                                                               month='long'
                                                                               day='numeric'
                                                                               weekday='long' /></span>
                </FormItem>
                    {endDate !== '' &&
                    <FormItem
                        {...formItemLayout}
                        style={{marginBottom:0}}
                        label="End Date"
                    >
                                <span className="ant-form-text"><FormattedDate value={endDate} year='numeric'
                                                                               month='long'
                                                                               day='numeric'
                                                                               weekday='long' /></span>
                    </FormItem>}
                </div>
                }


            </Form>
            </Modal>
        );
    }
}

const WrappedUserPlanEditFormForm = Form.create()(UserPlanEditForm);
export default WrappedUserPlanEditFormForm;
