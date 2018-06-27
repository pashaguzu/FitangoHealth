import React from 'react';
import moment from 'moment';
import {Form, Input, Select} from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const formItemLayoutDefault = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

export const TumorboardNotesForm = (props) => {
    const {form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator} = form;
    return <Form>
        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes', {
                    //initialValue: notes,
                }
            )(
                <TextArea autosize={{ minRows: 2 }}  />
            )}
        </FormItem>
    </Form>
}

export default TumorboardNotesForm;