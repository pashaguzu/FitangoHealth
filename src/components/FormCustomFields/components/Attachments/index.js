import React from 'react';
import {Card, Button, Icon, Tooltip, Row, Col, List, Avatar} from 'antd';
import {branch, compose, withState, withHandlers} from 'recompose';
import Upload from '../../upload';
import ReactPhotoGrid from 'react-photo-grid';
import {GalleryWide} from "../../../Gallery";


const AttachmentsPure = props => {
    const {openUpload=false, hideButton=false, showLoader, toggleLoader, onRequestCloseModal, attachments=[], showPreview=false, uploadOpts, template='attachments', limit=false} = props;
    console.log(attachments);
    return <React.Fragment>

        <AttachmentsList attachments={attachments} showPreview={limit === 1 || showPreview} limit={limit} />
        {!hideButton && <Button onClick={toggleLoader}>{attachments.length > 0 ? (limit === 1 ? 'Change' : 'Upload more') : 'Upload'}</Button>}

        <Upload {...uploadOpts} maxNumberOfFiles={limit}  template={template} /*allowedFileTypes={allowedFileTypes}*/ open={showLoader} onClose={toggleLoader} onComplete={props.onRequestCloseModal} />
    </React.Fragment>
}

const enhance = compose(
    branch(props => !props.showLoader, withState('showLoader', 'setShowLoader', props => props.showLoader || false)),
    withHandlers({
        toggleLoader: props => () => {
            props.setShowLoader(!props.showLoader);
        },
        onRequestCloseModal: props => (values) => {
            // console.log(values);
            if (props.onClose) {
                props.onClose(values);
            }
            props.setShowLoader(false);
        }
    })
)

export const Attachments = enhance(AttachmentsPure);



const getExtention = filename => {
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
}
export const formatBytes = (a,b) => {if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

export const AttachmentsList = ({attachments, isEditable=true, showPreview=true, limit = false}) => {
    // filter attachments
    const images = attachments.filter(attachment => {
        return attachment.type === "image";
    });
    const files = attachments.filter(attachment => {
        return attachment.type !== "image";
    });


    let imageData2 = images.map(image => image.url);
    // console.log(imageData2);
    // imageData2 = [
    //     'http://lorempixel.com/400/400/',
    //     'http://lorempixel.com/600/500/',
    //     'http://lorempixel.com/100/800/',
    //     'http://lorempixel.com/500/500/',
    // ];
    // console.log(imageData2);
    if (imageData2.length > 4) {
        imageData2 = imageData2.slice(0, 4);
    }
    //ReactPhotoGrid
    return <React.Fragment>
        {/*<div style={{width:200, height:200, overflow:'hidden'}}><ReactPhotoGrid*/}
            {/*gridSize="400x200"*/}

            {/*//onImageClick={this.handleImageClick}*/}
            {/*data={imageData2} />*/}
        {/*</div>*/}

        <GalleryWide
            images={images.map(image => ({src:image.url, thumbnail:image.url, orientation: 'landscape', caption: <a href={image.url} target="_blank"><Icon type="download" /> View Original</a> }))}
        />

        {files.length > 0 && <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            //bordered
            dataSource={files}
            renderItem={(attachment, i) => {
                //console.log(attachment);
                let element = '';
                let {type='', label='', size=0} = attachment;

                let image = '';
                const actions = false;//isEditable && <Tooltip title="Dlete"><Icon type="delete" style={{marginLeft:5}} /></Tooltip>;
                let icon = getIconByFileType({type, label});
                icon = <Avatar>{icon}</Avatar>;

                if (showPreview) {
                    switch(type) {
                        case 'video':
                            element = <video width="100%" controls>
                                <source src={attachment.url} /*type="video/mp4"*/ />
                                Your browser does not support HTML5 video.
                            </video>;
                            break;
                        // case 'image':
                        //     element = <img src={attachment.url} alt={label} style={{width:'100%'}} />;
                        //     break;
                        default:
                            label =  <a href={attachment.url} target="_blank">{label}</a>
                            break;
                    }
                    // if (limit === 1) {
                    //     element = {element};
                    // } else {
                        element = <List.Item>
                            <List.Item.Meta
                                avatar={<div>{icon}</div>}
                                title={label}
                                description={formatBytes(size,2)}
                            />
                             {element}</List.Item>;
                        // element = <Col /*sm={8} md={12} lg={8}*/  key={i}><Card key={i} type="inner" style={{marginBottom:16}} cover={image}
                        //                                                         title={} extra = {actions}>
                           // {}
                    //}

                } else {
                    element = <Col sm={8} md={12}  key={i}>
                        <span style={{float:'right'}}>{actions}</span>
                        <div>{attachment.url && attachment.url !== '' ?
                            <a href={attachment.url} target="_blank">{i + 1}. {image} {label}</a>
                            :
                            <Tooltip title="Broken Link. Please reupload the file"><span>{i + 1}. {image} {label}</span></Tooltip>}
                        </div>

                    </Col>;
                }

                return element;
            }}
        />}
    </React.Fragment>;
}


export const prepareAttachmentsForForm = (attachments, single) => {
    const existedAttachments = attachments.map(attachment => {
        return {existedId:attachment.id};
    });
    //console.log(attachments);
    if (single) {
        return existedAttachments.shift();
    }
    return existedAttachments;
}

export const formatFileName = item => {
    const {filename='', filesize=0} = item;

    return filename +' '+formatBytes(filesize, 2);
}
export const getIconByFileType = ({type, label='', asString=false}) => {
    let icon = '';
    switch(type) {
        case 'image':
            //return null;
            icon = <Icon type="picture" />;
            break;
        case 'video':
            icon = <Icon type="video-camera" />;
            break;
        default:
            const ext = getExtention(label);
            switch(ext) {
                default:
                    icon = <Icon type="file" />;
                    break;
                case 'pdf':
                    icon = <Icon type="file-pdf" />;
                    break;
                case 'ppt':
                case 'pptx':
                    icon = <Icon type="file-ppt" />;
                    break;
                case 'doc':
                case 'docx':
                    icon = <Icon type="file-word" />;
                    break;
                case 'xls':
                case 'xlsx':
                    icon = <Icon type="file-excel" />;
                    break;
                case 'rar':
                case 'zip':
                    icon = <Icon type="hdd" />;
                    break;

            }

            break;
    }

    return icon;
}