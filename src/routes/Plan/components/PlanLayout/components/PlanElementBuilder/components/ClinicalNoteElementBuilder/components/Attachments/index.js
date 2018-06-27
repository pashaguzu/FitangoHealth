import React from 'react';
import {Button} from 'antd';
import {compose, withState, withHandlers} from 'recompose';
import Upload from '../../../../../../../../../../components/FormCustomFields/upload';

const Attachments = props => {
    const {showLoader, toggleLoader, onRequestCloseModal, attachments} = props;
    const template = 'attachments';// attachments
    console.log(attachments);
    return <React.Fragment>

        <Button onClick={toggleLoader}>Upload</Button>

        <AttachmentsList attachments={attachments} />

        <Upload maxNumberOfFiles={false} template={template} /*allowedFileTypes={allowedFileTypes}*/ open={showLoader} onComplete={props.onRequestCloseModal} />
    </React.Fragment>
}

const enhance = compose(
    withState('showLoader', 'setShowLoader', false),
    withHandlers({
        toggleLoader: props => () => {
            props.setShowLoader(!props.showLoader);
        },
        onRequestCloseModal: props => (values) => {
            props.onClose(values);
            props.setShowLoader(false);
        }
    })
)

export default enhance(Attachments);


const AttachmentsList = ({attachments}) => {
    return attachments.map((attachment, i) => {
        console.log(attachment);
        return <div key={i}>
            <a href={attachment.url} target="_blank">{i+1}. {attachment.label}</a>
        </div>;
    });
}