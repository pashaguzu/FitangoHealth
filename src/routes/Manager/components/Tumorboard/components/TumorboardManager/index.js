import React from 'react';
import moment from 'moment';
import {Form, Input, Select} from 'antd';
import {DateField, StartEndTime} from "../../../../../../components/FormCustomFields/index";
import {PeopleSelect} from "../../../../../../components/Autosuggest/containers/PeopleSelect";

const FormItem = Form.Item;

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

export const TumorboardManager = (props) => {
    const {tumorboard={}, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator} = form;
    const {title='', startDate, endDate, startTime, endTime, notes='', location='', video='', lead={}, admin={}} = tumorboard;
    const {id:leadUid=''} = lead;
    const {id:adminUid=''} = admin;
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Title"
        >
            {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Cancer name",
                    whitespace: true
                }],
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Lead'
        >
            {getFieldDecorator('leadUid', {
                    initialValue: leadUid,
                    rules: [{required: true, message: "Select Lead"}],
                }
            )(
                <PeopleSelect />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Admin'
        >
            {getFieldDecorator('adminUid', {
                    initialValue: adminUid,
                    rules: [{required: true, message: "Select Admin"}],
                }
            )(
                <PeopleSelect />
            )}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label='Date'
            required
        >
            {getFieldDecorator('startDate', {
                    initialValue:  startDate ? moment(startDate) : moment(),
                    rules: [{required: true, message: "Select Admin"}],
                }
            )(
                <DateField />
            )}
            {/*{getFieldDecorator('date', {*/}
                    {/*initialValue: date ? moment(date) : undefined,*/}
                    {/*rules: [{required: true, message: "Select Date"}],*/}
                {/*}*/}
            {/*)(*/}
                {/*<DateField  />*/}
            {/*)}*/}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Time'
            required
        >
            <StartEndTime startTime={startTime} endTime={endTime} startDate={startDate} form={form} />
            {/*{getFieldDecorator('date', {*/}
            {/*initialValue: date ? moment(date) : undefined,*/}
            {/*rules: [{required: true, message: "Select Date"}],*/}
            {/*}*/}
            {/*)(*/}
            {/*<DateField  />*/}
            {/*)}*/}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label='Location'
        >
            {getFieldDecorator('location', {
                    initialValue: location,
                rules: [{required: true, message: "Enter Location"}],
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Video'
        >
            {getFieldDecorator('video', {
                    initialValue: video,
                }
            )(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Notes'
        >
            {getFieldDecorator('notes', {
                    initialValue: notes,
                }
            )(
                <Input />
            )}
        </FormItem>
    </Form>
}

export default TumorboardManager;