import React from 'react';
import { Icon, Button, Form} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import {RelativeDay} from "../../../../../../../../../../../Manager/components/Planbuilder/components/BuildHeader/components/Scheduling/components/RelativeDay/index";
import {DateField} from "../../../../../../../../../../../../components/FormCustomFields/index";

const FormItem = Form.Item;

let uuid = 1;
class SpecificDaysScheduling extends React.Component{

    /*constructor(props) {
        super(props);

        //isPlanFixed
    }*/

    remove = (k) => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('daykey');
       // const days = form.getFieldValue('schedule[days]');
        /*console.log(k, 'key');
        console.log(days,'days');
        console.log(keys,'schedule');*/

        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        //const newScheduleDays = days.filter((data, key) => key !== k);
        // can use data-binding to set
        form.setFieldsValue({
            daykey: keys.filter(key => key !== k),
        });

    }

    add = () => {
        const {form} = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('daykey');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            daykey: nextKeys,
        });
    }

    disabledDate = (date) => {
        if (date) {
            const {planSchedule} = this.props;
            const {
                startDate,
                endDate,
                limitStartDow,
                relativeEndDay
            } = planSchedule;

            //console.log(startDate);
            // check on start date
            const startDateMoment = moment(startDate);
            //console.log(startDateMoment);
            //console.log(date);
            if (startDateMoment.valueOf() > date.valueOf()) {
                return true;
            }
            if (endDate !== '') {
                const endDateMoment = moment(endDate);
                return endDateMoment.valueOf() < date.valueOf();
            }
        }
        return false
    }




    render(){

        const { intl, form, formItemLayout, formTailLayout, planSchedule, element} = this.props;
        const {getFieldDecorator, getFieldValue} = form;

        const {type} = planSchedule;
        const isPlanFixed = type === 'fixed';

        const {schedule:elementSchedule} = element;
        //const isPlanFixed = true;

        console.log(elementSchedule);



        // if plan is fixed dated - use onrdinary dates
        //console.log(planSchedule);

        /*if (isPlanFixed) {
            getFieldDecorator('daykey', {initialValue:[0]});
        }*/



        getFieldDecorator('daykey', {initialValue:[0]});
        const keys = getFieldValue('daykey');
        //const options = getFieldValue('options');
        const daysFields = keys.map((k, index) => {

            const label = 'Day ' + (index + 1);

            // remove icons
            const postHtml = keys.length > 1 ? (
                <Icon
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(index)}
                    style={{marginLeft: 5}}
                />
            ) : null;

            if (isPlanFixed) {
                const fieldName =  `schedule[dates][${k}]`;
                // if plan is fixed
                return <FormItem
                    key={index}
                    label={label}
                    {...formItemLayout}
                >
                    {getFieldDecorator(fieldName, {
                        //initialValue:[1,2],
                        rules: [{
                            type: 'object', required: true, message: 'Please Select',
                        }],
                    })(
                            <DateField disabledDate={this.disabledDate} />
                    )}
                    {postHtml}
                </FormItem>
            } else {
                const fieldName = `schedule[days][${k}]`;
                return (
                    <RelativeDay key={index} form={form} formItemLayout={formItemLayout} label={label}
                                 fieldName={fieldName} postHtml={postHtml}/>
                );
            }
        });

        return(
            <React.Fragment>
                {daysFields}
                <FormItem {...formTailLayout}>
                    <Button type="dashed" onClick={this.add} style={{width: '60%'}}>
                        <Icon type="plus"/> Add Day
                    </Button>
                </FormItem>
            </React.Fragment>
        );
    }

}

export default injectIntl(SpecificDaysScheduling);