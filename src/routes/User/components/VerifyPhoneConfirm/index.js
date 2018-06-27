/**
 * Created by Pavel on 09.12.2017.
 */
import React from 'react';
import { Card, Form, Input,Button } from 'antd';
import {
    injectIntl
} from 'react-intl';
import ru from './i18n/ru';
import en from './i18n/en';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

class VerifyPhoneConfirmForm extends React.Component {

    constructor() {
        super();
        this.state = {loading:false};
    }

    handleSubmit = (e) => {

        e.preventDefault();
        const { onSubmit } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                return onSubmit(values, this.props.userId);
            }
        });
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const {intl}=this.props;
        return (
            <div className="register-form" style={{padding:'8% 35% 20px'}}>
                <Form onSubmit={this.handleSubmit} >
                <Card
                    title={intl.messages.user_verifyphone_verifyphoneConfirm}
                    actions={[ <Button  loading={this.state.loading}  type="primary" htmlType="submit" className="register-form-button">
                        {intl.messages.user_verifyphone_send}
                    </Button>]}
                >

                        <FormItem
                            {...formItemLayout}
                            label={intl.messages.user_verifyphone_code}
                            hasFeedback
                        >
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message:intl.messages.user_verifyphone_rules },
                                    {len:4, message:intl.messages.user_verifyphone_message}
                                ],
                            })(
                                <Input size="large" />
                            )}
                        </FormItem>

                </Card>
                </Form>
            </div>
        );
    }
}
const WrappedVerifyPhoneConfirmForm = Form.create()(VerifyPhoneConfirmForm);
export default injectIntl(WrappedVerifyPhoneConfirmForm);
