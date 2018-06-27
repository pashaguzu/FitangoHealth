import React from 'react';
import {Form, Input} from 'antd';
import {ChemotherapySelect} from "../../../../../../../../../../../../components/Autosuggest/containers/ChemotherapySelect";
import {toNumber} from "../../../../../../../../../../../../utils/main";

const FormItem = Form.Item;

export const prepareInput = (values) => {
    let element = {...values,
        chemotherapyId: values.chemotherapy.id,
        cycles:parseInt(values.cycles),
        days:parseInt(values.days),
        timesPerDay:parseInt(values.timesPerDay),
        chemotherapy: undefined
    }
    //console.log(values);
    return {
        chemotherapyElement:element
    }
};

const checkChemotherapy = (rule, value, callback) => {
    callback();
    return;
    // if (value.number > 0) {
    //     callback();
    //     return;
    // }
    // callback('Price must greater than zero!');
}

export const TreatmentChemotherapyElementEditorPure = (props) => {
    const {form, details={}, formItemLayout={}, type=''} = props;
    const {getFieldDecorator} = form;

    const {element={}} = details;
    const {info={}} = element;
    const {chemotherapyElement=info} = details;
    const {chemotherapy={id:''}} = info;
    const {id='',chemotherapyId=chemotherapy.id, cycles='', days='', timesPerDay=''} = chemotherapyElement;
    //console.log(props,'TRTETET');
    // getFieldDecorator('id', {
    //     initialValue:id,
    // });
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label="Chemotherapy"
            >
                {getFieldDecorator('chemotherapy', {
                    initialValue:chemotherapy,
                    rules: [{required: true, validator: checkChemotherapy, message: "Enter Text"}],
                    validateTrigger: ['onChange', 'onSelect'],
                })(
                    <ChemotherapySelect getFullInfo />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Cycles"
            >
                {getFieldDecorator('cycles', {
                    initialValue:cycles,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Cycles", whitespace: true}],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="No of days"
            >
                {getFieldDecorator('days', {
                    initialValue:days,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Days", whitespace: true}],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="Times per day"
            >
                {getFieldDecorator('timesPerDay', {
                    initialValue:timesPerDay,
                    rules: [{required: true, type:'number',  transform: toNumber, message: "Enter Times per day", whitespace: true}],
                })(
                    <Input />
                )}
            </FormItem>
        </React.Fragment>
    );
};



export default TreatmentChemotherapyElementEditorPure;