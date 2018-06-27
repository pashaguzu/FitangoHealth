/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Card } from 'antd';
import {withRouter} from "react-router-dom";
import DiscussionView from './components/DiscussionView';
import CommentsView from './components/CommentsView';



class Discussions extends React.Component{



    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            return onSubmit(values);
        });
    }

    render(){
        const {loading,discussion,user, handleBreadcrumbChange} = this.props;
        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }
        handleBreadcrumbChange([['aaa','bbbb']]);
        const {title,id,text,createdAt,category,author,replies} = discussion;
        return(
            <div>
                    <DiscussionView user={user} discussion={{title,category,id,text,author,createdAt}}  discussionDelete={this.props.discussionDelete}/>
                    <CommentsView user={user} discussion={{id,category,replies}} onSubmit={this.props.onSubmit} discussionReply={this.props.discussionReply}   />
            </div>
        );
    }

}
export default withRouter(Discussions);