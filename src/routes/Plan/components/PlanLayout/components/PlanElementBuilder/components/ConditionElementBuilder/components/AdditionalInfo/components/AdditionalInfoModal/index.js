import React from 'react';
import {Form} from 'antd';
import {Wysiwyg} from "../../../../../../../../../../../../components/FormCustomFields/components/Wysiwyg/index";

const FormItem = Form.Item;

const AdditionalInfoModal = ({formItemLayout, form, footnote=''}) => {
    const {getFieldDecorator} = form;
    return  <FormItem>
        {getFieldDecorator('footnote', {
                initialValue: footnote,
                //rules: [{required: true, message: "Enter Title", whitespace: true}],
            }
        )(<Wysiwyg /> )}
    </FormItem>
}

export default AdditionalInfoModal;