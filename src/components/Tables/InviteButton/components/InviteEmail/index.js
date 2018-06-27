import React from 'react';
import {Card,Row,Col,Button,Select,Form,Divider,Radio,DatePicker,TimePicker, Input} from 'antd';
import InviteEmail from './InviteEmailForm/containers/inviteEmail';
const InviteEmailButton = ({visibleModal=false,openModal,hideModal}) => {
    //console.log(visibleModal,openModal);
    return  (<div><Button type="primary" onClick={openModal} >Email</Button>
     {visibleModal && <InviteEmail onHide={hideModal} />}</div>)
    
}

export default InviteEmailButton;