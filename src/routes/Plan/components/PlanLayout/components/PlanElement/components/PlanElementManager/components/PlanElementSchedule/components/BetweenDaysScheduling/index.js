import React from 'react';
import { Form, Checkbox} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';
import {StartEndForm} from "../../../../../../../../../../../../components/FormCustomFields/index";

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;


class BetweenDaysScheduling extends React.PureComponent{

    render(){

        const { intl, form, formItemLayout,  planSchedule, element} = this.props;
        const {getFieldDecorator, getFieldValue} = form;

        const {type} = planSchedule;
        const isPlanFixed = type === 'fixed';

        const {schedule} = element;
        const {startDate, endDate} = schedule;
        return(
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >

                    <StartEndForm startDate={startDate} endDate={endDate} form={form} names={{startDate: 'schedule[startDate]', endDate:'schedule[endDate]'}} />
                </FormItem>



        );
    }

}

export default injectIntl(BetweenDaysScheduling);
