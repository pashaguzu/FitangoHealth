
import React from 'react';
import { Form,Select,Modal,Input, DatePicker, TimePicker, message} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import AddressForm from '../../../../components/AddressForm';
import PhoneForm from '../../../../components/PhoneForm';
import {DateField} from "../../../../components/FormCustomFields/index";

const { TextArea } = Input;
const FormItem = Form.Item;



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

class AddCalendarEvent extends React.Component{
    state = {}

    static defaultProps = {
        eventTypes: [],
        eventDurations:[]
    }


    handleSubmit = () => {
        const { saveEvent } = this.props;
        this.props.form.validateFields((err, values) => {

            console.log(err);
            if (!err) {
                return saveEvent(values).then(() => {
                    message.success(this.props.intl.formatMessage(messages.sent));
                    this.props.onHide();
                });
            }
        });
    }

    render(){

        const {intl, eventTypes, eventDurations, form} = this.props;
        const {getFieldDecorator, getFieldValue} = form;

        const phoneNumberError = form.getFieldError('phone[number]');
        const addressError = false;//form.getFieldError('address');
        //console.log(addressError);
        let typeFields = '';
        switch(getFieldValue('type')) {
            default:break;
            case "inPerson":
                typeFields = <FormItem
                    {...formItemLayout}
                    label={'Address'}
                    validateStatus={addressError ? 'error' : ''}
                    help={addressError || ''}
                >
                    <AddressForm getFieldDecorator={getFieldDecorator} required  />
                </FormItem>
                    ;//countries={countries} states={states} address={user.address}
                break;
            case 'phone':
                typeFields = <FormItem
                    {...formItemLayout}
                    label="Phone"
                    required
                    validateStatus={phoneNumberError ? 'error' : ''}
                    help={phoneNumberError || ''}
                >
                   <PhoneForm getFieldDecorator={getFieldDecorator} required  />
                </FormItem>
                break;
        }

        return(
            <Modal
                title={intl.formatMessage(messages.modalTitle)}
                visible={true}
                onCancel={this.props.onHide}
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleSubmit}
                width={700}
            >
                <Form onSubmit={this.handleModalSubmit} >

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.subject)}
                    >
                        {getFieldDecorator('title',{
                                rules: [{ required: true, message:"Enter Title" , whitespace: true }],
                            }
                        )(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.date)}
                    >
                        {getFieldDecorator('date',{
                                rules: [{ required: true, message:"Select date" }],
                            }
                        )(
                            <DateField />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.time)}
                    >
                        {getFieldDecorator('time', {
                                rules: [{ required: true, message:"Select Time"}],
                            }
                        )(
                            <TimePicker format={'h:mm a'} minuteStep={30} use12Hours={true}/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.duration)}
                    >
                        {getFieldDecorator('duration', {
                                rules: [{ required: true, message:"Select Duration"}],
                            }
                        )(
                            <Select>
                                {eventDurations.map(info => {
                                    return  <Select.Option key={info.name}>{info.description}</Select.Option>
                                })}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.type)}
                    >
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message:"Select Type"}],
                            }
                        )(
                            <Select>
                                {eventTypes.map(info => {
                                    return  <Select.Option key={info.name}>{info.description}</Select.Option>
                                })}
                            </Select>
                        )}
                    </FormItem>

                    {typeFields}

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.message)}
                    >
                        {getFieldDecorator('message'
                        )(
                            <TextArea />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}
const AddCalendarEventForm = Form.create()(AddCalendarEvent);
export default injectIntl(AddCalendarEventForm);

