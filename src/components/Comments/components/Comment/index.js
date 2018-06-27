import React from 'react';
import moment from 'moment';
import './index.less';
import {Avatar} from "../../../../routes/User/components/Avatar/index";
import {AttachmentsList} from "../../../FormCustomFields/components/Attachments/index";

const Comment = props => {
    //console.log(props);
    const {message={}, userId='', showName=false} = props;
    const isMe = message.author && message.author.id === userId;
    const from = isMe ? 'me' : message.author.fullName;
    const {attachments=[]} = message;
    console.log(attachments, 'attachments');

    return (<div className={isMe ? 'me' : 'chatMessage'}>
        {!isMe ? <span style={{float:'left'}} ><Avatar info={message.author} tooltip useLink={false} /></span> : null }

        <span className={'meta'}>
            {showName && !isMe && <span className={'userName'} >{from}</span>}

            <span className={'time'}>
              {moment(message.createdAt).format('LLL')}
            </span>

        </span>

        <div>
            <AttachmentsList attachments={attachments} />
        </div>

        <div className={'bubble'}>
            <span dangerouslySetInnerHTML={{ __html: message.message }} />
        </div>
    </div>);
}

export default Comment;