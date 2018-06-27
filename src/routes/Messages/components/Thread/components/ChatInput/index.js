import React from 'react';
import {Input } from 'antd';
import  './index.less';

export default class ChatInput extends React.Component {
    constructor() {
        super();
        this.state = {
            value: null,
        };
    }
    componentDidMount() {
        this.inputElement.focus();
    }
    onKeyDown = (e) => {
        if (e.nativeEvent.keyCode === 13) {
            e.preventDefault();
            this.sendMessage();
        }
    }
    sendMessage = () => {
        const { value } = this.state;
        this.props.onSendMessage(value);
        this.setState({
            value: null,
        });
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        return (<div className={'input'}>
            <Input
                value={this.state.value}
                onChange={this.handleChange}
                ref={c => { this.inputElement = c; }}
                onKeyDown={this.onKeyDown}
                type="textarea"
                autosize
            />
            <span className={'suffix'} onClick={this.sendMessage}>
                <span className={'send'}>Send</span>
            </span>
        </div>);
    }
}