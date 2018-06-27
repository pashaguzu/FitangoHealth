/**
 * Created by Pavel on 10.01.2018.
 */
import React from 'react';
import {Form,Input,Modal,Card} from 'antd';
import {withRouter} from "react-router-dom";
import {
    injectIntl
} from 'react-intl';
import messages from './discussionModal.json';
const FormItem = Form.Item;
const { TextArea } = Input;
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




class DiscussionModal extends React.Component{




    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if(err!=null)
            {

                return null;
            }
            return onSubmit(values);
        });
    }

    render(){

        const {loading} = this.props;
        if (loading) {
            return (
                <Card loading  title="Modal">Loading!!!</Card>
            );
        }
        const { intl } = this.props;
        const { getFieldDecorator } = this.props.form;


        return(
                <Modal
                    title={intl.formatMessage(messages.start)}
                    visible={true}
                    okText={intl.formatMessage(messages.submit)}
                    onOk={this.handleSubmit}
                    onCancel={this.props.onCancel}
                    destroyOnClose
                >
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem
                            {...formItemLayout}
                            label={intl.formatMessage(messages.title)}
                        >
                            {getFieldDecorator('title',{
                                rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={intl.formatMessage(messages.text)}
                        >
                            {getFieldDecorator('text',{
                                rules: [{ required: true, message:"Input text Please" , whitespace: true }],
                            })(
                                <TextArea  autosize={{ minRows: 2 }} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

const WrappedDiscussionModal = Form.create()(DiscussionModal);
export default withRouter((injectIntl(WrappedDiscussionModal)));
