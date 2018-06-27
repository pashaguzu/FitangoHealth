/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Card} from 'antd';
import {withRouter} from "react-router-dom";
import CommentsList from '../../components/CommentsList';
import InputBox from '../../../InputBox'
import {
    injectIntl
} from 'react-intl';


class CommentsView extends React.Component{







    render(){
        const {loading,discussion,user} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {replies} = discussion;

        return(
                <Card
                    title="Replies"
                >
                    <InputBox discussion={discussion} user={user} onSubmit={this.props.onSubmit}/>
                    <CommentsList discussion={{replies}} user={user} discussionReply={this.props.discussionReply} />
                </Card>
        );
    }

}
export default withRouter(injectIntl(CommentsView));
