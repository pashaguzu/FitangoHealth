import React from 'react';
import { Card, Tooltip, Input,Col,Select,Form, DatePicker, Radio, Button, } from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import FlexibleScheduling from './components/FlexibleScheduling';
import FixedLengthScheduling from './components/FixedLengthScheduling';
import FixedScheduling from './components/FixedScheduling';
import DowScheduling from './components/DowScheduling';
import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;


class Scheduling extends React.Component{

    render(){

        const { intl, form, tailFormItemLayout } = this.props;
        const { getFieldDecorator, getFieldValue } = form;

        const schedule = getFieldValue('schedule[type]');
        let scheduleBox ='';
        switch(schedule) {
            case 'flexible':
                scheduleBox = <FlexibleScheduling {...this.props} />
                break;
            case 'fixed':
                scheduleBox = <FixedScheduling {...this.props} />
                break;
            case 'dow':
                scheduleBox = <DowScheduling {...this.props} />
                break;
            case 'fixedLength':
                scheduleBox = <FixedLengthScheduling {...this.props} />
                break;
        }
        return(
            <Card title={intl.formatMessage(messages.componentTitle)}>

                <FormItem
                    {...tailFormItemLayout}
                >
                    {getFieldDecorator('schedule[type]', {
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <RadioGroup className={'schedule-wrap'}>
                            <Tooltip title="It's flexible"><RadioButton value="flexible">Any time</RadioButton></Tooltip>
                            <Tooltip title="Appears between a start and an end date"><RadioButton value="fixed">Set Dates</RadioButton></Tooltip>
                            <Tooltip title="Appears on specific days of the week"><RadioButton value="dow">Day of the week</RadioButton></Tooltip>
                            <Tooltip title="Limited by number of days"><RadioButton value="fixedLength">Number of days</RadioButton></Tooltip>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...tailFormItemLayout}
                >
                {scheduleBox}
                </FormItem>
            </Card>
        );
    }

}

export default injectIntl(Scheduling);
