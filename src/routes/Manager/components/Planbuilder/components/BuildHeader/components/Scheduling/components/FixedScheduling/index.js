import React from 'react';
import { Card, Select, Form, Radio} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import {StartEndForm} from "../../../../../../../../../../components/FormCustomFields";

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

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

class FixedScheduling extends React.Component{

    render(){

        const { intl, form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        //const scheduleAnyTime = getFieldValue('scheduleAnyTime');

        return(
            <Card type="inner" title={intl.formatMessage(messages.componentTitle)}>
                    <StartEndForm names={{startDate:"schedule[startDate]", endDate:"schedule[endDate]"}} form={form} inline={false} />
            </Card>
        );
    }

}

export default injectIntl(FixedScheduling);
