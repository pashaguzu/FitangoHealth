import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteMeeting from './InviteMeetingForm/containers/inviteMeeting';
const InviteMeetingButton = ({visibleModal=false,openModal,hideModal}) => {
    //console.log(visibleModal,openModal);
    return  (<div><Button type="primary" onClick={openModal} >Meeting invite</Button>
     {visibleModal && <InviteMeeting onHide={hideModal} />}</div>)
    
}

export default InviteMeetingButton;