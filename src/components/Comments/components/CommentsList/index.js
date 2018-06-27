import React from 'react';
import Comment from '../Comment';
import {Spinner} from "../../../Modal/index";

const CommentsList = props => {
    const {messages=[], userId='', loading=false} = props;

    if (loading) {
        return <Spinner />
    }
    return messages.map((message, i) => {
        return <Comment key={i} message={message} userId={userId} />;
    });
}

export default CommentsList;