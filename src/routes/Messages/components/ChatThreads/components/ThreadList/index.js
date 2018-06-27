import React from 'react';
import { Badge, Input,Avatar} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import Truncate from 'react-truncate';
import  './index.less';
const Search = Input.Search;
//
// const select = props => ({
//     filterValue: props.conversations.filterValue,
//     active: props.conversations.active,
//     conversations: props.conversations.list,
// });

// function highlight(text, highlightValue) {
//     if (!highlightValue) return text;
//     return text.replace(
//         new RegExp(`(${highlightValue})`, 'g'),
//         (str, p1) => `<span style="color: #38b8f2">${p1}</span>`
//     );
// }


export default class ThreadList extends React.Component {
    static defaultProps = {
        conversations: [],
        currentId: ''
    }

    render() {

        const {conversations, currentId} = this.props;


        if (conversations.length === 0) {
            return <div className="ant-list-empty-text">No Conversations</div>;
        }

        return <div>
            <div style={{padding:10}}>
                <Search
                placeholder="Search"
            />
            </div>

            <div>
                {conversations.map(conversation => {
                    const unreadMessages = conversation.unreadMessages
                    return <NavLink key={conversation.id} to={'/messages/'+conversation.id}><div className={"conversation " + (currentId === conversation.id ? 'active' : '')}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div className="conversation--details">
                        <div className="conversation--details_name"><span className="subject"><Badge count={unreadMessages} >{conversation.subject}</Badge> </span><span className="date">{moment(conversation.lastMessage.sentAt).fromNow()}</span></div>
                        <div className="conversation--details_text"><Truncate>{conversation.lastMessage.text}</Truncate></div>
                    </div>

                </div></NavLink>})}

            </div>
            </div>
    }
}

/*

    render() {

        const {conversations} = this.props;

        return <div>
            <div style={{padding:10}}>
                <Search
                placeholder="Search"
            />
            </div>
            {conversations.length > 0 && conversations.map(item => {
                return  <div style={{clear:'both'}}><NavLink to={'/messages/'+item.id} style={{color:'inherit'}} >
                    <div style={{display: 'flex', height:64}}>
                        <Avatar style={{position:'absolute'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        <div><div>{item.subject}</div><div>{item.subject}</div></div>
                    </div>
                </NavLink></div>
            })}
            </div>
    }
 */


