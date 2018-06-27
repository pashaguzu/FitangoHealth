/**
 * Created by Павел on 31.01.2018.
 */
import React from 'react';
import {Card,Row,Col,Popconfirm,Tooltip,Icon } from 'antd';
import AvatarWithName from '../../../../../../../User/components/AvatarWithName';
import moment from 'moment';
import {withRouter} from "react-router-dom";
import {
    injectIntl
} from 'react-intl';
import messages from './messages';


class DiscussionView extends React.Component{



    handleClick = () => {
        const { discussion, discussionDelete, history } = this.props;
        discussionDelete(discussion.id).then(({data}) => {
            history.push("/community/"+discussion.category.id);
        });
    }


    render(){

        const {loading,discussion,user} = this.props;

        if (loading) {
            return (
                <Card loading >Loading!!!</Card>
            );
        }

        const {title,text,author,createdAt} = discussion;
        const {id} = author;
        const {intl}=this.props;
        return(

                <Card  title={title} extra={
                      <div>
                          {id===user.id ?
                        <Popconfirm title={intl.formatMessage(messages.popconfirm)}
                                    onConfirm={this.handleClick}
                                    okText={intl.formatMessage(messages.yes)}
                                    cancelText={intl.formatMessage(messages.no)}>
                        <Tooltip title={intl.formatMessage(messages.delete)}><Icon type="close" /></Tooltip>
                        </Popconfirm> :null}
                          </div>}>
                    <Row><p>{text}</p></Row>
                    <Row>
                    <Col span={2}><AvatarWithName info={user}/></Col>
                    </Row>
                    <Row><label>{ moment(createdAt).format('LLL')}</label></Row>
                </Card>
        );
    }

}
export default withRouter(injectIntl(DiscussionView));
