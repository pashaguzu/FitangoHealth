import React from 'react';
import {Modal, Form, Input} from 'antd';
import {compose, withHandlers, withProps} from 'recompose';
import {withModal} from "../../../../../../../../../../components/Modal/index";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};


const enhance = compose(
    withProps(props => {
        const modalTitle = props.type === '' ? 'Select Element' : props.getTypeName(props.type);
        return {
            modalTitle
        }
    }),
    withHandlers({
        onSubmit: props => () => {

            const prepareInput = props.prepareInput;
            const callback = props.onHide;
            props.onSubmit({prepareInput, callback});
        }
    }),

    withModal
);

const treatmentModalHOC = (WrappedComponent) => {

    const treatmentWithModal = props => {

        const {form, details={}} = props;
        const {notes=''} = details;

        return <React.Fragment>
            <WrappedComponent {...props} formItemLayout={formItemLayout} />
            <FormItem
                {...formItemLayout}
                label="Instructions"
            >
                {form.getFieldDecorator('notes', {
                        initialValue:notes,
                    }
                )(
                    <Input.TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                )}
            </FormItem>
        </React.Fragment>
    }

    return treatmentWithModal;
}

export const modalHOC = compose(

    treatmentModalHOC,
    enhance
);