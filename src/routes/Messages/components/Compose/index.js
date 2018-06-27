
import React from 'react';
import { Form,Checkbox,Modal,Input, message} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
import RecipientAutoComplete from './containers/RecipientAutoComplete';
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

class Compose extends React.Component{
    state = {}


    handleSubmit = () => {
        const { sendMessage } = this.props;
        this.props.form.validateFields((err, values) => {


            if (!err) {
                return sendMessage(values).then(() => {
                    message.success(this.props.intl.formatMessage(messages.sent));
                    this.props.onCancel();
                });
            }
        });
    }

    render(){

        const {intl} = this.props;
        const {getFieldDecorator} = this.props.form;

        return(
            <Modal
                title={intl.formatMessage(messages.title)}
                visible={true}
                onCancel={this.props.onCancel}
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleSubmit}
            >
                <Form onSubmit={this.handleModalSubmit} >
                    <RecipientAutoComplete label={intl.formatMessage(messages.to)} formItemLayout={formItemLayout} form={this.props.form} />

                    {/*If this is not the user mode - we should add if it's around the patient*/}

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.subject)}
                    >
                        {getFieldDecorator('subject',{
                                rules: [{ required: true, message:"Enter Subject" , whitespace: true }],
                            }
                        )(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.message)}
                    >
                        {getFieldDecorator('message',{
                                rules: [{ required: true, message:"Enter message" , whitespace: true }],
                            }
                        )(
                            <TextArea  autosize={{ minRows: 2 }}  />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.urgent)}
                    >
                        {getFieldDecorator('isUrgent'
                        )(
                            <Checkbox >{intl.formatMessage(messages.urgency_text)}</Checkbox>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}
const ComposeModal = Form.create()(Compose);
export default injectIntl(ComposeModal);

