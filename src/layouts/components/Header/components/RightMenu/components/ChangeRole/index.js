
import React from 'react';
import { Form,Select,Modal, message} from 'antd';
import {withRouter} from 'react-router-dom'
import {
    injectIntl
} from 'react-intl';
import messages from './messages';
const FormItem = Form.Item;



const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class ChangeRole extends React.Component{
    state = {}


    handleSubmit = () => {
        const { changeRole, currentRole, onHide } = this.props;
        this.props.form.validateFields((err, values) => {

            if (!err) {
                const {role} = values;

                if (role !== currentRole ) {
                    return changeRole(role).then(() => {
                        message.success(this.props.intl.formatMessage(messages.updated));
                        onHide();
                        this.props.history.push('/');
                        // redirect to main page
                    }).catch(() => {

                    });
                } else {
                    onHide();
                }
            }
        });
    }

    render(){

        const {intl, roles, currentRole} = this.props;
        const {getFieldDecorator} = this.props.form;

        return(
            <Modal
                title={intl.formatMessage(messages.modalTitle)}
                visible={true}
                onCancel={this.props.onHide}
                okText={intl.formatMessage(messages.update)}
                onOk={this.handleSubmit}
            >
                <Form onSubmit={this.handleModalSubmit} >

                    <FormItem
                        {...formItemLayout}
                        label={intl.formatMessage(messages.selectRole)}
                    >
                        {getFieldDecorator('role',{
                                initialValue: currentRole,
                                rules: [{ required: true, message:"Select Role"}],
                            }
                        )(
                            <Select>
                                {roles.map((info, i) => <Select.Option key={info}>{info}</Select.Option>)}
                            </Select>
                        )}
                    </FormItem>


                </Form>
            </Modal>
        );
    }

}
const ChangeRoleForm = Form.create()(ChangeRole);
export default injectIntl(withRouter(ChangeRoleForm));

