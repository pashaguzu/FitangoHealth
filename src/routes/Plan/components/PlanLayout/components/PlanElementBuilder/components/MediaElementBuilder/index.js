import React from 'react';
import {injectIntl} from 'react-intl';
import {compose, withHandlers, withState} from 'recompose';
import {Form, Input, Button} from 'antd';
import messages from './messages';
import Upload from '../../../../../../../../components/FormCustomFields/upload';
import MediaPreview from './components/MediaPreview';
import {Attachments, prepareAttachmentsForForm} from "../../../../../../../../components/FormCustomFields/components/Attachments/index";

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

export const getMediaTypeInfo = (type) => {
    console.log(type);
    let template = '';
    let note = '';
    let name = type;
    let allowedFileTypes = ['application/*'];
    switch(type) {
        case 'document':
            template='document';
            name = 'Document';
            break;
        case 'ppt':
            //note = '.ppt, .pptx';
            template = 'ppt';
            break;
        case 'image':
            note = '.jpeg, .jpg, .gif, .tiff, .png, .bmp';
            allowedFileTypes = ['image/*'];
            template = 'instructions_image';
            name = 'Image';
            break;
        case 'video':
        case 'import':
            note = '.avi, .mpg, mpeg, .mov, .mp4, 3gp, .flv, H.263, H.264, .webm';
            allowedFileTypes = ['video/*'];
            template = 'instructions_video';
            name = 'Video';
            break;
        case 'audio':
            allowedFileTypes = ['audio/*'];
            note = '.mp4, .mp3, .mp2';
            template = 'mp3';
            name = 'Audio';
            break;
        case 'pdf':
            note = '.pdf';
            template = 'pdf';
            break;
    }
console.log({name, template, note, allowedFileTypes});
    return {name, template, note, allowedFileTypes};
}

const MediaElementBuilder = (props) => {
    //console.log(props);
    const {form, intl,  details={}, showLoader, typeMedia, tmpMedia, attachments=[]} = props;
    const {getFieldDecorator} = form;
    const {label='', url='', description='', mediaType=''} = details;
    //let template = '';
    //let note = '';
    //let allowedFileTypes = ['application/*'];
    let type = mediaType !== '' ? mediaType : typeMedia;
    //console.log(typeMedia);
    // switch(type) {
    //     case 'document':
    //         template='document';
    //         break;
    //     case 'ppt':
    //         //note = '.ppt, .pptx';
    //         template = 'ppt';
    //         break;
    //     case 'image':
    //         note = '.jpeg, .jpg, .gif, .tiff, .png, .bmp';
    //         allowedFileTypes = ['image/*'];
    //         template = 'instructions_image';
    //         break;
    //     case 'video':
    //     case 'import':
    //         note = '.avi, .mpg, mpeg, .mov, .mp4, 3gp, .flv, H.263, H.264, .webm';
    //         allowedFileTypes = ['video/*'];
    //         template = 'instructions_video';
    //         break;
    //     case 'audio':
    //         allowedFileTypes = ['audio/*'];
    //         note = '.mp4, .mp3, .mp2';
    //         template = 'mp3';
    //         break;
    //     case 'pdf':
    //         note = '.pdf';
    //         template = 'pdf';
    //         break;
    // }
    let {note, template, allowedFileTypes} = getMediaTypeInfo(type);

    getFieldDecorator('attachment', {initialValue: prepareAttachmentsForForm(attachments, true)});
    return (
        <React.Fragment>

            {getFieldDecorator('file', {
                    initialValue:'',
                }
            )}
            {getFieldDecorator('type', {
                    initialValue: type,
                }
            )}
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.title)}
            >
                {getFieldDecorator('label', {
                        initialValue:label,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.upload)}
            >
                <Attachments onClose={props.onCompleteUploadModal} attachments={attachments} limit={1}
                             uploadOpts={
                                 allowedFileTypes
                            }
                             template={template}
                />
            </FormItem>
        </React.Fragment>
    );
}


const enhance = compose(
    injectIntl,
    withState('showLoader', 'setShowLoader', false),
    withState('tmpMedia', 'setTmpMedia', {}),
    withState('attachments', 'setAttachments', props => {
        const {details={}} = props;

        const {id='', filename='', mediaType:type='', url='', filesize=0} =details;
        if (id === '') {
            return [];
        }
        return [{id:id, label: filename, type: type, url:url, size: filesize}];
    }),
    withHandlers({
        showUploadModal: props => () => {
            props.setShowLoader(true);
        },
        onCompleteUploadModal: props => (attachment=null) => {

            //
            /*if (values) {
                //console.log(props);
                //console.log(values);
                props.form.setFieldsValue({'file': {results:values}});
               //props.onSubmit()
                props.setTmpMedia(values);
            }*/

            //props.setShowLoader(false);





            //console.log(props);
            const {form} = props;

            //console.log();
            const {uploads = []} = attachment;
            const fields = uploads.map(upload => {
                const {type, url, name='', size=0} = upload;
                return {id:'', label: name, type, url, size};
            });

            console.log(attachment);
            console.log(fields);
            //attachmentsView = [...attachmentsView],
            //console.log(attachmentsPure);
            form.setFieldsValue({
                attachment: {transloadit:attachment}
            });
            props.setAttachments(fields);
        },
    })
);

export default enhance(MediaElementBuilder);

export const prepareInput = (values) => {
    //console.log(values);
    const {label, file, type, attachment=null} = values;

    return {
        mediaElement: {
            label,
            type,
            attachment
        }
    }
}