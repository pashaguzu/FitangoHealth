import React from 'react';
import {Tooltip, Icon, Row, Col} from 'antd';
import ThreadList from './components/ThreadList';
import Compose from '../../containers/Compose';
import styles from './index.less'

export default class ChatThreads extends React.Component {

    state = {showCreate:false}
    static defaultProps = {
        currentId: ''
    }

    componentWillReceiveProps(nextProps) {

        if (!nextProps.loading) {
            const {conversations, currentId} = nextProps;
            conversations.map(info => {
                if (info.id === currentId) {
                    // if it's current conversation, then check the last message
                    const {lastMessage} = info;
                    const {id} = lastMessage;
                    this.props.setLastCursor(id);
                }
                return info;
            })
        }
        /*if (nextProps.lastCursor !== this.props.lastCursor  ) {
            this.props.setLastCursor(nextProps.lastCursor);
        }*/
    }


    toggleCreate = () => {
        this.setState({showCreate: !this.state.showCreate})
    }
    render() {

        const {conversations, currentId} = this.props;
        return (<div className={'slider'}>
            <div className={'visitorList'}>

                {this.state.showCreate && <Compose onCancel={this.toggleCreate} />}
                <Row type="flex" className={'sliderHeader'}>
                    <Col md={18}>Conversations</Col>
                    <Col md={6} style={{textAlign: 'right'}}><Tooltip title="Create Conversation"><Icon type="form" onClick={this.toggleCreate} style={{color: '#1a8fff'}}/></Tooltip></Col>
                </Row>
                <ThreadList conversations={conversations} currentId={currentId}/>
            </div>
        </div>);
    }
}