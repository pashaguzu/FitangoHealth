import React from 'react';
import { Icon,Col, } from 'antd';
import  './index.less';

export default class ChatHeader extends React.Component {

    static defaultProps = {
        subject: ''
    }
    render() {

        const {subject, toggleInfo, showInfo} = this.props;
        return <div className={'header'}>
            <Col md={23} style={{textAlign:'center'}}>{subject}</Col>
            <Col md={1}><Icon type={showInfo ? "info-circle" : "info-circle-o" } onClick={toggleInfo} style={{color:'#1a8fff'}} /></Col>

        </div>
    }
}
