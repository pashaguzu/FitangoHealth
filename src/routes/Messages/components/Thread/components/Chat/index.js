import React from 'react';
import ChatHeader from '../ChatHeader';
import ChatPresent from '../ChatPresent';
import ChatInfo from '../../containers/Info';
import ChatInput from '../../containers/ChatInput';
import  './index.less';


export default class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfo:false
        }
    }
    static defaultProps = {
        lastCursor: '',
    }
    componentWillReceiveProps(nextProps) {

        if (!nextProps.loading && nextProps.lastCursor !== this.props.lastCursor  ) {
            // fetch more results
            this.props.loadMoreEntries(this.props.lastCursor);
        }
    }

    toggleInfo = () => {
        this.setState({showInfo:!this.state.showInfo});
    }

    render() {
        return <div className={'panel'} style={ { display: 'flex' }}>
            <ChatHeader {...this.props} toggleInfo={this.toggleInfo} showInfo={this.state.showInfo} />
            <div style={{display: 'flex',
                flex: '1 1 0%', flexDirection: 'row-reverse'}}>
                {this.state.showInfo && <ChatInfo {...this.props}  />}
                <div className={'panelMain'}>
                    <ChatPresent {...this.props}  />

                    <ChatInput id={this.props.id} lastCursor={this.props.lastCursor} />
                </div>
            </div>
        </div>
    }
}
