import React from 'react';
import {Form, Checkbox, Row, Col, Select } from 'antd';
import Tracker from '../../../../../../../Tracker';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 5},
};

const TrackerAdvanced = ({details, form, measurement={}}) => {
    const {isCritical=false, criticalRange={}, normalRange={}, allowMultipleReports} = details;
    console.log(details);
    console.log(isCritical);
    const {getFieldDecorator, getFieldValue} = form;
    return <React.Fragment>

        <FormItem
            {...formTailLayout}
        >
            <div>
            {getFieldDecorator('isCritical', {
                initialValue: isCritical,
                valuePropName: 'checked'
                }
            )(
                <Checkbox>This is a critical tracker</Checkbox>
            )}
            {getFieldValue('isCritical') === true &&
            <React.Fragment>

                <FormItem
                    {...formItemLayout}
                >
                    <div>Critical Range {criticalRange.min}</div>
                    <Col offset={1} span={10}>
                        <Col span={8}> below </Col><Col span={14}>
                    {getFieldDecorator('criticalRange[min]', {
                        initialValue: criticalRange.min || ''
                        /*rules: [{ type:"float" }]*/
                    })(
                        <Tracker item={measurement} />
                    )}
                    </Col>
                    </Col>
                    <Col offset={1} span={10}>
                        <Col  span={8}> above </Col><Col span={14}>
                    {getFieldDecorator('criticalRange[max]', {
                        initialValue: criticalRange.max || ''
                    })(
                       <Tracker item={measurement} />
                    )}
                    </Col>
                    </Col>
                </FormItem>

            </React.Fragment>
            }
            </div>



        <div
        >
            {getFieldDecorator('setNormalRange', {
                initialValue: (normalRange.min !== '' || normalRange.max !== ''),
                valuePropName: 'checked'
                }
            )(
                <Checkbox>Set Normal Range</Checkbox>
            )}
            {getFieldValue('setNormalRange') === true &&
            <React.Fragment>

                <FormItem
                    {...formItemLayout}

                >
                    <div>Normal Range</div>
                    <Col offset={1} span={10}>
                        <Col span={8}> below </Col><Col span={14}>
                    {getFieldDecorator('normalRange[min]', {
                        initialValue: normalRange.min || ''
                        /*rules: [{ type:"float" }]*/
                    })(
                        <Tracker item={measurement} />
                    )}
                    </Col>
                    </Col>
                    <Col offset={1} span={10}>
                        <Col  span={8}> above </Col><Col span={14}>
                    {getFieldDecorator('normalRange[max]', {
                        initialValue: normalRange.max || ''
                    })(
                       <Tracker item={measurement} />
                    )}
                    </Col>
                    </Col>
                </FormItem>

            </React.Fragment>
            }
        </div>


        <div
        >
            {getFieldDecorator('isMultiple', {
                initialValue: allowMultipleReports,
                valuePropName: 'checked'
                }
            )(
                <Checkbox>Allow multiple reports per day</Checkbox>
            )}
            {getFieldValue('isMultiple') === true &&
            <React.Fragment>

                <FormItem
                    {...formItemLayout}
                    label="View as"
                >

                    {getFieldDecorator('treatAs', {
                        //initialValue: info.criticalRange.max
                    })(
                        <Select style={{width: 100}}>
                            <Select.Option key={1}>Average</Select.Option>
                            <Select.Option key={2}>Sum</Select.Option>
                        </Select>

                    )}
                </FormItem>

            </React.Fragment>
            }
        </div>


        <div
        >
            {getFieldDecorator('showTotals', {
                valuePropName: 'checked'
                }
            )(
                <Checkbox>Show Accumulated Totals for Blood pressure</Checkbox>
            )}
            {getFieldValue('showTotals') === true &&
            <React.Fragment>

                <FormItem
                    {...formItemLayout}
                >

                    {getFieldDecorator('summary[week]', {
                        }
                    )(
                        <Checkbox>Show weekly totals</Checkbox>
                    )}
                    {getFieldDecorator('summary[month]', {
                        }
                    )(
                        <Checkbox>Show monthly totals</Checkbox>
                    )}
                    {getFieldDecorator('summary[overall]', {
                        }
                    )(
                        <Checkbox>Show overall totals</Checkbox>
                    )}
                </FormItem>

            </React.Fragment>
            }
        </div>
        </FormItem>
    </React.Fragment>
}


export default TrackerAdvanced;