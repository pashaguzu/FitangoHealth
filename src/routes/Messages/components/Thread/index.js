import React from 'react';
import ChatConversation from './containers/Chat';
import  './index.less';

export default class ThreadList extends React.Component {

    static defaultProps = {
        id: ''
    }




    render() {
        const {id} = this.props;
        return <div className={'mainPanel'}>

            {id !== '' ?
            <ChatConversation {...this.props}

            /> : <div style={{  width:'60%', top: '30%', textAlign:'center', position: 'absolute',

                    'flexDirection':'column'}}>Please select Conversation on the left side first</div>}
        </div>
    }
}


