/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import { Form,Icon,Modal,Input} from 'antd';
import {withRouter} from "react-router-dom";
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const { TextArea } = Input;
const FormItem = Form.Item;

class CommentModal extends React.Component{
    state = { visible: true ,title:""}


    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleModalSubmit = () => {
        const { discussionReply } = this.props;
        this.props.form.validateFields((err, values) => {
            if(err!=null)
            {

                return null;
            }

            discussionReply(values.textReply,this.props.match.params.id, this.props.params);

        });
    }

    render(){

        const {intl}=this.props;
        const {getFieldDecorator} = this.props.form;

        return(
                <Modal
                    title={intl.formatMessage(messages.reply)}
                    visible={true}
                    onCancel={this.props.unshowModal}
                    okText={intl.formatMessage(messages.send)}
                    onOk={this.handleModalSubmit}
                >
                    <Form onSubmit={this.handleModalSubmit} >
                        <FormItem>
                            {getFieldDecorator('textReply',{
                                    initialValue: this.state.title,
                                    rules: [{ required: true, message:"Input text Please" , whitespace: true }],
                                }
                            )(

                                <TextArea
                                    suffix={<Icon type="paper-clip" />}
                                    autosize={{ minRows: 2}}
                                />

                            )}
                        </FormItem>
                    </Form>

                </Modal>
        );
    }

}
const WrappedCommentModal = Form.create()(CommentModal);
export default withRouter(injectIntl(WrappedCommentModal));

