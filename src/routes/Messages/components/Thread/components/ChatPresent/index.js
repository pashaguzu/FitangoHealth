import React from 'react';
import { getRequestAnimationFrame, easeInOutCubic } from '../../../../../../utils/animate';
import moment from 'moment';
import {Avatar} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import  './index.less';
const reqAnimFrame = getRequestAnimationFrame();

class ChatPresent extends React.Component {

    static defaultProps = {
        messages:[]
    }
    componentDidMount() {
        this.scrollIntoView();
        // add scroll
        //window.addEventListener('scroll', this.handleScroll);
    }
    componentDidUpdate() {
        this.scrollIntoView();
    }
    componentWillUnmount() {
        // remove scroll
        //window.removeEventListener('scroll', this.handleScroll);
    }
    /*handleScroll = (event) => {
        let scrollTop = event.srcElement.body.scrollTop,
            itemTranslate = Math.min(0, scrollTop/3 - 60);


    }*/
    scrollIntoView = () => {
        if (this.props.loading) { return; }
        if (!this.container) { return; }
        const container = this.container;
        const startTime = Date.now();
        const scrollTop = container.scrollTop;
        const targetScrollTop = container.scrollHeight;

        // check if we scroll top

        const frameFunc = () => {
            const timestamp = Date.now();
            const time = timestamp - startTime;
            container.scrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
            if (time < 450) {
                reqAnimFrame(frameFunc);
            }
        };
        reqAnimFrame(frameFunc);
    }

    loadItems = (page) => {

    }

    render() {
        const { loading, messages, userId } = this.props;

        if (loading) {
           // return <Card  bordered={false} loading>Loading...</Card>
        }


        return (<div
            ref={c => {this.container = c;}}
            className={'chatPresent'}
        >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                isReverse={true}
                loadMore={this.loadItems}
                hasMore={true}
                useWindow={false}
            >
            {messages.map((conversation, idx) => {
                const isMe = conversation.sender && conversation.sender.id === userId;
                const from = isMe ? 'me' : conversation.sender.fullName;

                return (<div key={`present-${idx}`} className={isMe ? 'me' : 'chatMessage'}>
                    {!isMe ?  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{float:'left'}} /> : null }

                    <span className={'meta'}>

                        {!isMe && <span className={'userName'}>
              {from}
            </span>}

                            <span className={'time'}>
              {moment(conversation.sentAt).format('LLL')}
            </span>

        </span>

                    <div className={'bubble'}>
                        <span dangerouslySetInnerHTML={{ __html: conversation.text }} />
                    </div>
                </div>);


            })}
            </InfiniteScroll>
        </div>);
    }
}

export default ChatPresent