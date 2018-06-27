/**
 * Created by Pavel on 21.12.2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    FormattedMessage,
} from 'react-intl';

import moment from 'moment';
import {Spin, Modal, Form, List, Radio, Row, TimePicker, Col, Select, Input} from 'antd';
import {StartEndForm} from "../../../../../../../../../components/FormCustomFields";

const {Option} = Select;
const FormItem = Form.Item;
const format = 'h:mm a';
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

//let total;


class EditMedicationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timesAtHours:0,
            inited:false,
            advance:false,
            total: null
        };
    };

    static propTypes = {
        userId: PropTypes.string,
        drugId: PropTypes.string,
        id: PropTypes.string,

    }

    static defaultProps = {
        drugId: '',
        id: '',

    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading && !this.state.inited) {
            this.setState({timesAtHours:nextProps.info.timesPerHour.length, inited:true});
        }
    }



    handleCancel = () => {

    }

    onChangeDate = (field, value) => {
        this.setState({
            [field]: value,
        });

    }
    onChange = (e) => {
        this.setState({
            showHours: e.target.value,
        });
    };
    onSelect = (value) => {
        this.setState({
            timesAtHours: value
        });
    };
    onAdvance = (e) => {
        this.setState({
            advance: true
        });
    };
    onTotal = (e) => {
        //let notPermanent = 0;
       // notPermanent += Number(e)
       // total = notPermanent;

    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {info, date, userId, drugId, updateMedication, onCancel} = this.props;
        const {id, timesPerHour} = info;
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const {type, startDate, endDate, purpose, timesAtHours, directions, sideEffects, quantity, timesPerDay} = values;
                let times = [];

                if (type === 'at_times') {
                    times = timesAtHours.map((timeInfo, i) => {
                        const id = timesPerHour[i] ? timesPerHour[i]['id'] : '';
                        return {id, "time": timeInfo.time.format("HH:mm:ss"), "quantity": timeInfo.quantity}
                    })
                }

                const startDateYMD = startDate.format("YYYY-MM-DD");
                const endDateYMD = endDate ? endDate.format("YYYY-MM-DD") : '';
                const input = {
                    drugId: drugId,
                    type: type,
                    startDate: startDateYMD,
                    endDate: endDateYMD,
                    purpose: purpose,
                    directions: directions,
                    sideEffects: sideEffects,
                    quantity: quantity,
                    timesPerDay: timesPerDay,
                    timesAtHours: times,
                }

                return updateMedication(id, userId, input, date, onCancel);
            }
        });

    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;

        const {info, loading, dateFormat} = this.props;

        if (loading) {
            return <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height: 150, textAlign: 'center', lineHeight: 5}}
            >
                <Spin tip="Loading..."/>
            </Modal>
        }

        let {type, drug, timesPerDay, timesPerHour, quantity, startDate, endDate, purpose, sideEffects, directions} = info;//.medication;




        if (timesPerDay === 0) {
            timesPerDay = 1;
        }

        let Take = [];


        if (this.state.timesAtHours > 0) {
            // if we selected at times
            for (let i = 0; i < this.state.timesAtHours; i++) {

                // check if we have times per hour
                const timePerHour = timesPerHour[i] || {time:moment('00:00:00', format),quantity:1}
                let {time, quantity:timeQuantity} = timePerHour;
                    time = moment(time, format);

                Take.push(<div>
                        <Col span={10}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('timesAtHours['+i+'][time]', {
                                    initialValue: time,
                                    rules: [{
                                        required: true, message: 'Please Select',
                                    }],
                                })(
                                    <TimePicker format={format} minuteStep={30} use12Hours={true}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col offset={1} span={6}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('timesAtHours['+i+'][quantity]', {
                                    initialValue: timeQuantity,
                                    rules: [{
                                        required: true, message: 'Please Select',
                                    }],
                                })(
                                    <Select onChange={this.onTotal} style={{width: 80}}>
                                        <Option value={0.25}>¼</Option>
                                        <Option value={0.5}>½</Option>
                                        <Option value={0.75}>¾</Option>
                                        <Option value={1}>1</Option>
                                        <Option value={1.25}>1¼</Option>
                                        <Option value={1.5}>1½</Option>
                                        <Option value={1.75}>1¾</Option>
                                        <Option value={2}>2</Option>
                                        <Option value={2.25}>2¼</Option>
                                        <Option value={2.5}>2½</Option>
                                        <Option value={2.75}>2¾</Option>
                                        <Option value={3}>3</Option>
                                        <Option value={3.25}>3¼</Option>
                                        <Option value={3.5}>3½</Option>
                                        <Option value={3.75}>3¾</Option>
                                        <Option value={4}>4</Option>
                                        <Option value={4.25}>4¼</Option>
                                        <Option value={4.5}>4½</Option>
                                        <Option value={4.75}>4¾</Option>
                                        <Option value={5}>5</Option>
                                        <Option value={5.25}>5¼</Option>
                                        <Option value={5.5}>5½</Option>
                                        <Option value={5.75}>5¾</Option>
                                        <Option value={6}>6</Option>
                                        <Option value={6.25}>6¼</Option>
                                        <Option value={6.5}>6½</Option>
                                        <Option value={6.75}>6¾</Option>
                                        <Option value={7}>7</Option>
                                        <Option value={7.25}>7¼</Option>
                                        <Option value={7.5}>7½</Option>
                                        <Option value={7.75}>7¾</Option>
                                        <Option value={8}>8</Option>
                                        <Option value={8.25}>8¼</Option>
                                        <Option value={8.5}>8½</Option>
                                        <Option value={8.75}>8¾</Option>
                                        <Option value={9}>9</Option>
                                        <Option value={9.25}>9¼</Option>
                                        <Option value={9.5}>9½</Option>
                                        <Option value={9.75}>9¾</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </div>
                )
            }
        }




        return (
            <Modal
                visible={true}
                destroyOnClose
                maskClosable={false}
                keyboard={false}
                okText="Save"
                onCancel={this.props.onCancel}
                title={drug.name}
                onOk={this.handleSubmit}
            >

                <Form>

                    {<FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="user.settings.basic.title" defaultMessage="Take"
                                                 description="Take"/>}
                    >
                        {getFieldDecorator('type', {
                            initialValue: type,
                            rules: [{
                                required: true, message: 'Please Select',
                            }],
                        })(
                            <RadioGroup onChange={this.onTotal} style={{marginTop:5}}>
                                <Radio style={radioStyle} value="at_times">At specific times</Radio>
                                <Radio style={radioStyle} value="along_day">Along the day</Radio>
                                <Radio style={radioStyle} value="as_needed">As needed</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>}

                    {getFieldValue('type') === "at_times" ?
                        <FormItem
                            {...formItemLayout}
                            label={<FormattedMessage id="medication.times_per_day" defaultMessage="Times per Day"
                                                     description="Times per Day"/>}
                        >

                            {getFieldDecorator('timesPerHour', {
                                initialValue: timesPerHour.length > 0 ? timesPerHour.length : null,
                                rules: [{
                                    required: true, message: 'Please Select',
                                }],
                            })(
                                <Select onSelect={this.onSelect} placeholder="Select times" style={{width: 200}}>
                                    <Option value={1}>1 Time</Option>
                                    <Option value={2}>2 Times</Option>
                                    <Option value={3}>3 Times</Option>
                                    <Option value={4}>4 Times</Option>
                                    <Option value={5}>5 Times</Option>
                                </Select>
                            )}
                            {Take.length > 0 &&
                            <div><Row>
                                <Col span={10}><label>Take at</label></Col>
                                <Col offset={1} span={6}><label>Quantity</label></Col>
                            </Row>
                                <List
                                    grid={{gutter: 5, md: 1}}
                                    dataSource={Take}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                        </List.Item>
                                    )}
                                /></div>}

                            {/*<Col offset={7} span={5}><label>Total</label></Col>
                            <Col span={6}><label>{total}</label></Col>*/}
                        </FormItem> :

                        <div>
                            <Row>
                                <Col offset={6} span={10}><label>Take</label></Col>
                                <Col offset={1} span={6}><label>Quantity</label></Col>
                            </Row>
                            <Row>

                                <Col offset={6} span={10}>
                                    <FormItem
                                        {...formItemLayout}
                                    >

                                        {getFieldDecorator('timesPerDay', {
                                            initialValue: timesPerDay
                                        })(
                                            <Select onSelect={this.onSelect} style={{width: 200}}>
                                                <Option value={1}>1 Time</Option>
                                                <Option value={2}>2 Times</Option>
                                                <Option value={3}>3 Times</Option>
                                                <Option value={4}>4 Times</Option>
                                                <Option value={5}>5 Times</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col offset={1} span={6}>
                                    <FormItem
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator('quantity', {
                                            initialValue: quantity > 0 ? quantity : 1
                                        })(
                                            <Select onChange={this.onTotal} style={{width: 80}}>
                                                <Option value={0.25}>¼</Option>
                                                <Option value={0.50}>½</Option>
                                                <Option value={0.75}>¾</Option>
                                                <Option value={1}>1</Option>
                                                <Option value={1.25}>1¼</Option>
                                                <Option value={1.50}>1½</Option>
                                                <Option value={1.75}>1¾</Option>
                                                <Option value={2}>2</Option>
                                                <Option value={2.25}>2¼</Option>
                                                <Option value={2.50}>2½</Option>
                                                <Option value={2.75}>2¾</Option>
                                                <Option value={3}>3</Option>
                                                <Option value={3.25}>3¼</Option>
                                                <Option value={3.50}>3½</Option>
                                                <Option value={3.75}>3¾</Option>
                                                <Option value={4}>4</Option>
                                                <Option value={4.25}>4¼</Option>
                                                <Option value={4.50}>4½</Option>
                                                <Option value={4.75}>4¾</Option>
                                                <Option value={5}>5</Option>
                                                <Option value={5.25}>5¼</Option>
                                                <Option value={5.50}>5½</Option>
                                                <Option value={5.75}>5¾</Option>
                                                <Option value={6}>6</Option>
                                                <Option value={6.25}>6¼</Option>
                                                <Option value={6.50}>6½</Option>
                                                <Option value={6.75}>6¾</Option>
                                                <Option value={7}>7</Option>
                                                <Option value={7.25}>7¼</Option>
                                                <Option value={7.50}>7½</Option>
                                                <Option value={7.75}>7¾</Option>
                                                <Option value={8}>8</Option>
                                                <Option value={8.25}>8¼</Option>
                                                <Option value={8.50}>8½</Option>
                                                <Option value={8.75}>8¾</Option>
                                                <Option value={9}>9</Option>
                                                <Option value={9.25}>9¼</Option>
                                                <Option value={9.50}>9½</Option>
                                                <Option value={9.75}>9¾</Option>
                                            </Select>
                                        )}

                                    </FormItem>

                                </Col>
                                {/*<Col offset={14} span={3}><label>Total</label></Col>
                            <Col span={2}><label>jk</label></Col>*/}
                            </Row>
                        </div>
                    }


                    <FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="medication.period" defaultMessage="Period" description="Period"/>}
                    >

                        <StartEndForm startDate={startDate} endDate={endDate} dateFormat={dateFormat} form={this.props.form} />

                    </FormItem>

                    {/*<FormItem
                        {...formItemLayout}
                        label={<FormattedMessage id="user.settings.basic.tdegsiftdle" defaultMessage="Image"
                                                 description="Image"/>}
                    >
                        {getFieldDecorator('purpose', {
                            initialValue: '',
                        })(
                            <Col>
                                <a>Browse</a>
                                <p>Min. dimensions: 150x150px</p>
                            </Col>
                        )}
                    </FormItem>*/}

                    {/*Advanced settings*/}
                    {!this.state.advance ?
                        <a onClick={this.onAdvance}>Advanced</a> :
                        <div>
                            <FormItem
                                {...formItemLayout}
                                label={<FormattedMessage id="user.settings.basic.tdgsiftdle" defaultMessage="Purpose"
                                                         description="Purpose"/>}
                            >
                                {getFieldDecorator('purpose', {
                                    initialValue: purpose,
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<FormattedMessage id="user.settings.basic.tdsitfdle1" defaultMessage="Directions"
                                                         description="Direcctions"/>}
                            >
                                {getFieldDecorator('directions', {
                                    initialValue: directions,
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={<FormattedMessage id="user.settings.basic.tddsitdle1"
                                                         defaultMessage="Side Effects" description="Side Effects"/>}
                            >
                                {getFieldDecorator('sideEffects', {
                                    initialValue: sideEffects,
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </div>

                    }
                </Form>
            </Modal>
        );
    }
}

const WrappedEditMedicationForm = Form.create()(EditMedicationForm);
export default WrappedEditMedicationForm;