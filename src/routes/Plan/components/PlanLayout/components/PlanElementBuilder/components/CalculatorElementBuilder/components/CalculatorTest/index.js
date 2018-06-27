import React from 'react';
import { Form, Table, Modal, Alert, Input, Mention } from 'antd';

import math from 'mathjs';
import Tracker from "../../../../../../../Tracker";
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';

const { toString, toContentState, getMentions } = Mention;

const FormItem = Form.Item;

const doMath = (string) => {
    if (string !== '') {
        return Math.eval(string);;

    }
    return null;
}

const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};


export const replaceArray = function(replaceString, find, replace) {
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "g");
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
};

const CalculatorTest = (props) => {

    const {formula, trackers, form, title} = props;
    const {getFieldDecorator} = form;

    // prepare formula
    const formulaContent = toContentState(formula);
    const mentions = getMentions(formulaContent);

    console.log(mentions);


    return <Modal
        title={"Test "+title}
        visible={true}
        onCancel={props.onHide}
        footer={false}
    >
        <Form>
        {mentions.map(mention => {
            console.log(mention);
            return trackers.map((option, index) => {
                //console.log('@'+option.label.split(' ').join('_'));
                if ('@'+option.label.split(' ').join('_') !== mention) {
                    return null;
                }
                return (
                    <FormItem
                        {...formItemLayout}
                        label={option.label}
                        required={true}
                        key={option.id}
                    >
                        {getFieldDecorator(`trackers_tmp[${index}]`, {
                            initialValue: '',
                            //validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "Please input option title or delete this field.",
                            }],
                        })(
                            <Tracker item={option} />
                        )}
                        {option.units.name}

                    </FormItem>
                );
            })
        })}

        </Form>
        <CalculatorTestResult form={form} trackers={trackers} formula={formula} mentions={mentions} />

    </Modal>;
}


const enhance = compose(
    Form.create(),
    withProps(props => {


    }),
    withHandlers({
        getCalculatedField: props => record => {
            console.log(record);
            console.log(`tracker[${record.i}]`);

            return (
                props.form.getFieldDecorator(`tracker[${record.i}]`, {
                        //initialValue:title,
                        //rules: [{required: true, message: "Enter Value", whitespace: true}],
                    }
                )(<Tracker key={record.id} item={record} />));
            }
    })
);

export default enhance(CalculatorTest);




const CalculatorTestResult = ({form, trackers, formula, mentions}) => {

    const {getFieldDecorator, getFieldValue, getFieldsValue} = form;




    const trackerValues =  getFieldValue('trackers_tmp') || [];
    //console.log(trackerValues);
    let find = [];
    let replace = [];
    let replaceValue = [];
    let trackersUsed = 0;

    const trackersSource = mentions.map(mention => {
            trackers.map((tracker, i) => {
                const code = tracker.label.split(' ').join('_');
                if ('@'+tracker.label.split(' ').join('_') !== mention) {
                    return null;
                }
                find.push('@' + code);
                replace.push(tracker.label);

                const value = trackerValues[i] || '';
                //console.log(value);
                if (value && value !== '')
                    replaceValue.push(value);

                trackersUsed++;
                return {...tracker, key: tracker.id, i};
            });
        })




    const formulaFormatted = replaceArray(formula, find, replace);
    const formulaValueFormatted = replaceArray(formula, find, replaceValue);
    const canCalculate = replaceValue.length === trackersUsed;
    const calculationResult =  canCalculate ? math.round(math.eval(formulaValueFormatted), 2) : 'N/A';
    // get values







    return (
        <div>
            {canCalculate && <Alert message='Result' description={calculationResult} type="success" showIcon style={{marginBottom:10}} />}
        <Alert message='Formula' description={formulaFormatted} type="info" showIcon />
        {canCalculate && <Alert message="Formatted" description={formulaValueFormatted} type="warning" showIcon style={{marginTop:10}} />}

        </div>
    )
}