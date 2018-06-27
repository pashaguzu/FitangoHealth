import React from  'react';
import {Button, Form} from 'antd';
import AdditionalInfoModal from './containers/AdditionalInfoModal';

const FormItem = Form.Item;
const formTailLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20, offset: 4},
};

const AdditionalInfo = ({toggleModal, viewModal, ...otherProps}) => {
    const {footnote = '', form} = otherProps;
    const footnoteForm = form.getFieldValue('footnote');
    //console.log(footnoteForm);
    const showEdit = (footnoteForm && footnoteForm !== '') || footnote !== '';
    return <React.Fragment>
        <FormItem {...formTailLayout}>
            <Button type={'primary'} onClick={toggleModal} style={{width: '60%'}}> {showEdit !== '' ? 'Edit Additional Info' : '+ Add Additional Info'}</Button>
        </FormItem>

        <AdditionalInfoModal modalVisible={viewModal} onHide={toggleModal} {...otherProps}  />
    </React.Fragment>
}

export default AdditionalInfo;