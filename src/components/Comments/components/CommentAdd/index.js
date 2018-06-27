import React from 'react';
import {Icon, Input, Form, message as messageModal, Button, Tooltip} from 'antd';
import {injectIntl} from 'react-intl';
import {branch, compose, withHandlers, withState} from 'recompose';
import {Attachments} from "../../../FormCustomFields/components/Attachments/index";

const FormItem = Form.Item;
const { TextArea } = Input;


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

const CommentAdd = props => {
    const {form, intl, openUpload=false, attachments=[]} = props;
    const {getFieldDecorator} = form;

    return <Form onSubmit={props.handleSubmit} >

        <div
        >
            {getFieldDecorator('message',{
                    rules: [{ required: true, message:"Enter Message" , whitespace: true }],
                }
            )(
                <TextArea autosize={{ minRows: 1 }}  />
            )}
        </div>
        {getFieldDecorator('attachments', {initialValue: []})}
        <Attachments showLoader={openUpload} attachments={attachments} setShowLoader={props.toggleAttachments} hideButton onClose={props.onCloseAttachments} />
        <div
            style={{textAlign:'right', marginTop:5}}
        >
            <Tooltip title="Add attachments"><Icon type="paper-clip" onClick={props.toggleLoader} /></Tooltip> <Button type="primary" onClick={props.handleSubmit}>Post</Button>
        </div>
    </Form>
}

const enhance = compose(
    injectIntl,
    Form.create(),
    withState('attachments','setAttachments', []),
    withState('openUpload','toggleAttachments', false),
    withHandlers({
        handleSubmit: props => () => {
            const  {form} = props;
            form.validateFields((err, values) => {

                if (!err) {
                    const {userId, tagId, tagType} = props;
                    const {message, attachments} = values;
                    return props.sendMessage({userId, tagId, tagType, message, attachments}).then(() => {
                        messageModal.success('Sent');
                        // reset form
                        form.resetFields();
                    });
                }
            });
        },
        toggleLoader: props => () => {
            props.toggleAttachments(!props.openUpload);
        },
        onCloseAttachments: props => result => {
            const {form, attachments:attachmentsInitial=[]} = props;
            const files = form.getFieldValue('attachments');
            const attachments = [...files, result];
            let attachmentsForm = [];


            attachments.map(attachment => {
                //console.log();
                const {uploads = []} = attachment;
                const fields = uploads.map(upload => {
                    const {type, url, name:label=''} = upload;
                    console.log(type);
                    switch (type) {
                        case 'video':
                            return {id:'', label: label, type: 'video', url:url};
                            break;
                        case 'image':
                            return {id:'', label: label, type: 'image', url:url};
                            break;
                        default:
                            return {id:'', label: label, type: type, url:url};
                            break;
                    }
                    return null;
                });

                //attachmentsView.push(fields);
                if (fields.length > 0) {
                    attachmentsForm = [...attachmentsForm, ...fields]
                    //attachmentsForm.push(fields[0]);
                    return fields[0];
                }
                return null;
            });

            const attachmentsView = [...attachmentsInitial, ...attachmentsForm];

            //attachmentsView = [...attachmentsView],
            console.log(attachments);
            console.log(attachmentsView);
            form.setFieldsValue({
                attachments
            });
            props.setAttachments(attachmentsView);
        }
    })
);

export default enhance(CommentAdd);