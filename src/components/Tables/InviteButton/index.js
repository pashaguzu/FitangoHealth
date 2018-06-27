import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteEmail from './containers/InviteEmail';
import InviteSMS from './containers/InviteSMS';
import InviteMeeting from './containers/InviteMeeting';
const InviteButton = ({ form, formItemLayout,targetKeys,selectedKeys,handleChange,selectedCount}) => {
  
    return  (<Row>
        <br/>
    <Col offset={1} span={3}><p>{selectedCount} Selected</p></Col>
    <Col offset={12} span={3}><InviteMeeting /></Col>
    <Col span={2}><InviteEmail /></Col>
    <Col span={2}><InviteSMS />   <br/></Col>
    </Row>)
}

export default InviteButton;