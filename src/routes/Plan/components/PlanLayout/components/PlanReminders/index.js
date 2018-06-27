import React from 'react';

import {Modal, Form, Icon, Input, Button, TimePicker, Select, Spin, Tooltip, Col } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const format = 'h:mm a';


let UID = 0;

export class PlanReminders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
        this.addReminder = this.addReminder.bind(this);
        this.removeReminder = this.removeReminder.bind(this);
    };


    addReminder = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(UID);
        UID++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }
    removeReminder = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {

                //return saveReminders(values);
            }
        });
    }

    render() {
        const {loading,reminderTypes, notificationTypes} = this.props;

        if (loading) {
            return <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height: 150, textAlign: 'center', lineHeight: 5}}
            >
                <Spin tip="Loading..."/>
            </Modal>
        }
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k) => {
            return (
                <FormItem
                    {...formItemLayout}
                    required={false}
                    key={k}
                >
                    <Col xs={23}>

                        <InputGroup >
                            <Col span={10}>
                            {getFieldDecorator(`reminder[${k}][type]`, {
                                rules: [{
                                    required: true,
                                    message: "Please fill in the info or delete.",
                                }],
                            })(
                            <Select placeholder="When" defaultActiveFirstOption style={{width:'100%'}}>
                                {reminderTypes.map((type)=> <Option key={type.name} value={type.name}>{type.description}</Option>)}
                            </Select>
                            )}
                            </Col>
                            <Col span={10}>
                            {getFieldDecorator(`reminder[${k}][method]`, {
                                rules: [{
                                    required: true,
                                    message: "Please fill in the info or delete.",
                                }],
                            })(
                            <Select placeholder="Method" mode="multiple" style={{width:'100%'}} >
                                {notificationTypes.map((type)=> <Option key={type.name} value={type.name}>{type.description}</Option>)}
                            </Select>
                            )}
                            </Col>
                            <Col span={4}>
                            {getFieldDecorator(`reminder[${k}][time]`, {
                                rules: [{
                                    required: true,
                                    message: "Please fill in the info or delete.",
                                }],
                            })(
                            <TimePicker style={{width:'100%'}} placeholder="Time" format={format} minuteStep={30} use12Hours={true}/>
                            )}
                            </Col>
                            </InputGroup>

                    </Col>
                    <Col xs={1} style={{lineHeight:'32px', textAlign:'right'}}>
                        <Tooltip title="Delete"><Icon
                            type="minus-circle-o"
                            onClick={() => this.removeReminder(k)}
                        /></Tooltip>
                    </Col>
                </FormItem>
            );
        });
        return (<Modal
                        visible={true}
                        title={'Plan Reminders'}
                        onOk={this.handleSubmit}
                        onCancel={this.props.onClose}
                        width={600}
                    >

                        <Form onSubmit={this.handleSubmit} className="login-form">
                            {formItems}
                            <FormItem style={{textAlign:'center'}}>
                                <Button type="dashed" onClick={this.addReminder} style={{ width: '60%' }}>
                                    <Icon type="plus" /> Add Reminder
                                </Button>
                            </FormItem>
                        </Form>

                    </Modal>
        );
    }
}

const WrappedPlanReminders = Form.create()(PlanReminders);
export default WrappedPlanReminders;