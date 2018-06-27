import React from 'react';
import { Form,Modal,Input} from 'antd';
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;

class AddSectionModal extends React.Component{

    componentDidMount () {
        setTimeout(() => this.input.focus(), 0)
    }

    handleModalSubmit = () => {
        const { submitLesson } = this.props;
        this.props.form.validateFields((err, values) => {
            if(!err)
            {
                submitLesson(values.title);
            }
        });
    }

    render(){

        const {intl}=this.props;
        const {getFieldDecorator} = this.props.form;

        return(
            <Modal
                title={intl.formatMessage(messages.modalTitle)}
                visible={true}
                onCancel={this.props.onHide}
                okText={intl.formatMessage(messages.send)}
                onOk={this.handleModalSubmit}
            >
                <Form>
                    <FormItem>
                        {getFieldDecorator('title',{
                                rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                            }
                        )(
                            <Input placeholder="Action title"  ref={node => this.input = node} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }

}
const WrappedAddLessonModal = Form.create()(AddSectionModal);
export default injectIntl(WrappedAddLessonModal);

