import React from 'react';
import { Card, Select, Form, Radio} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import {StartEndForm} from "../../../../../../../../../../components/FormCustomFields";

const Option = Select.Option;
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

const dows = [
    {name:'sun', value:'Sun'},
    {name:'mon', value:'Mon'},
    {name:'tue', value:'Tue'},
    {name:'wed', value:'Wed'},
    {name:'thu', value:'Thu'},
    {name:'fri', value:'Fri'},
    {name:'ast', value:'Sat'},
]
class DowScheduling extends React.Component{

    render(){

        const { intl, form } = this.props;
        const { getFieldDecorator, getFieldValue } = form;

        return(
            <Card type="inner" title={intl.formatMessage(messages.componentTitle)}>

                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator('schedule[dows]', {
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select Days"
                        >
                            {dows.map(info => <Option key={info.name}>{info.value}</Option>)}
                        </Select>
                    )}
                </FormItem>


            </Card>
        );
    }

}

export default injectIntl(DowScheduling);
