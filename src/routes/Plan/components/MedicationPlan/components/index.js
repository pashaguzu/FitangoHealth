import React from 'react';
//import Medication from './Medication/components';
import MedicationCoin from './Medication/components/MedicationCoin/containers';
import MedicationSelect from './Medication/components/MedicationSelect/containers';
import MedicationInfo from './Medication/components/MedicationInfo/containers';
import {MedicationAddForm } from './Medication/components/MedicationEdit/containers';
import MedicationSummary from './Medication/containers/MedicationSummary';
import Motivators from '../../../../User/containers/motivatorsContainer';
import moment from 'moment';
import './index.css';
import {
    FormattedMessage,
    FormattedDate,
    FormattedTime,
} from 'react-intl';

import { Menu, Dropdown, Popover, Table,Button, Icon, Modal, Divider, Card, Tooltip, Col } from 'antd';

export class MedicationPlanBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuilderMode: false,// if this is a builder mode
            date: props.date,
            addModal:false,
            showSummary:false,
            medId:'',
            showMotivatorsModal:false,
        };

        this.addMedication = this.addMedication.bind(this);
        this.toggleSummary = this.toggleSummary.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.toggleMotivators = this.toggleMotivators.bind(this);
    };
    static propTypes = {
    };
    static defaultProps = {
        date:  moment().format('YYYY-MM-DD')
    }

    showDate = (type) => {
        var dateTime = new Date(this.state.date);
        let date = '';
        if (type === 'prev') {
             date = moment(dateTime).add(-1, 'days').format("YYYY-MM-DD");
        } else {
             date = moment(dateTime).add(1, 'days').format("YYYY-MM-DD");
        }
        this.setState({date:date});
        this.props.loadDate(date, this.props.user_id);
    };

    addMedication = (id) => {
        // create a new medication

        this.setState({
            addModal:true,
            medId:id
        });
    }

    hideAddMedication = () => {
        // create a new medication

        this.setState({
            addModal:false,
            medId:0


        });
    }

    handleMenuClick(e) {

        switch(e.key) {
            case 'motivators':
                // show motivators modal
                this.toggleMotivators();
                break;
            default:break;
        }
    }

    toggleMotivators() {
        this.setState({showMotivatorsModal:!this.state.showMotivatorsModal});
    }

    toggleSummary() {
        if (this.state.showSummary) {
            this.setState({showSummary:false});
        } else {
            this.setState({showSummary:true});
        }

    }


    render() {

        const {info,  loading, user_id} = this.props;
        const {date} = this.state;

        if (loading) {
            return (
                <Card loading title={<FormattedMessage id="plan.medicationpan.medication.card.title2" defaultMessage="Medications for {date}" values={{
                    date: <FormattedDate
                        value={moment(date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    />
                }} description="Medications for Today" />}>
                Loading
                </Card>
            );
        }
        const {takeDaily, takeAsNeeded, takeAtTimes} = info.medicationsByType;

        let columns = [];
        let takeDailyColumns = [];
        let takeDailyData = [];
        let takeAsNeededColumns = [];
        let takeAsNeededData = [];
        let data = [];

        if (takeAtTimes.length > 0/*type == 'at_times'*/) {
            columns = [
                {title: 'Medication', width: 300, dataIndex: 'name', key: 'name', fixed: 'left', className: 'transparent'},
            ];

            takeAtTimes.map(medication => {

                let {reports} = medication;
                //const report = reports && reports[0] || {};
                let medic_times = {
                    key: medication.id+'drug',
                    name: <MedicationInfo user_id={user_id} date={date} info={medication} />
                }

                const at_times = medication.timesPerHour;

                at_times.map(function (time_info) {

                    let report = {};
                    if (reports) {
                         report = reports.filter((e) => e.time === time_info.time);
                         if (report.length > 0) {
                             report = report[0];
                         }
                    }

                    const {time, quantity} = time_info;
                    if (!columns.some(item => time === item.time)) {
                        columns.push({
                            time: time,
                            title: <FormattedTime value={new Date(date+' '+time)} />,
                            dataIndex: 'time_' + time_info.time,
                            key: 'time_' + time_info.id,

                        });
                    }
                    medic_times['time_'+time_info.time] = <MedicationCoin key={time_info.id+'k'} userId={user_id} med_id={medication.id} report={report} quantity={quantity} time={time} date={date}/>;
                    return time_info;
                });


                data.push(
                    medic_times
                );
                return medication;
            });
        }

        //take daily
        if (takeDaily.length > 0) {
            takeDailyColumns = [
                {
                    title: 'Medication',
                    width: 300,
                    dataIndex: 'name',
                    key: 'name',
                    fixed: 'left',
                    className: 'transparent'
                },
                {
                    title: 'Report',
                    dataIndex: 'report',
                    key: 'report',
                },
            ];
            takeDaily.map(medication => {

                const {reports} = medication;
                //const report = reports && reports[0] || {};
                let rows = [];
                const timesPerDay = medication.timesPerDay;
                const quantity = medication.quantity;

                for (var i = 0; i < timesPerDay; i++) {
                    const report = (reports && reports[i]) || {};

                    rows.push(<Col xs={3} key={i}><MedicationCoin med_id={medication.id} userId={user_id} quantity={quantity} report={report} date={date} /></Col>);
                }
                takeDailyData.push({
                    key: medication.id + 'drug',
                    name: <MedicationInfo user_id={user_id} date={date} info={medication}/>,
                    report: rows
                });
                return medication;
            });
        }

        if (takeAsNeeded.length > 0) {
            takeAsNeededColumns = [
                {
                    title: 'Medication',
                    width: 300,
                    dataIndex: 'name',
                    key: 'name',
                    fixed: 'left',
                    className: 'transparent'
                },
                {
                    title: 'Report',
                    dataIndex: 'report',
                    key: 'report',
                },
            ];
            takeAsNeeded.map(medication => {

                const {reports} = medication;
                //const report = reports && reports[0] || {};
                let rows = [];
                const timesPerDay = medication.timesPerDay;
                const quantity = medication.quantity;

                for (var i = 0; i < timesPerDay; i++) {
                    const report = (reports && reports[i]) || {};

                    rows.push(<Col xs={3} key={i}><MedicationCoin med_id={medication.id} userId={user_id} quantity={quantity} report={report} date={date} /></Col>);
                }
                takeAsNeededData.push({
                    key: medication.id + 'drug',
                    name: <MedicationInfo user_id={user_id} date={date} info={medication}/>,
                    report: rows
                });
                return medication;
            });
        }


        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {/*<Menu.Item disabled key="refill">Add Refill</Menu.Item>*/}
                <Menu.Item  key="motivators">Motivators</Menu.Item>
                <Menu.Item disabled key="commitment">Make a Commitment</Menu.Item>
                <Menu.Item disabled key="promise">Make a Promise</Menu.Item>
                <Menu.Item disabled key="print">Print</Menu.Item>
            </Menu>
        );

        return (
                <Card title={<FormattedMessage id="plan.medicationpan.medication.card.title2" defaultMessage="Medications for {date}" values={{
                    date: <FormattedDate
                        value={moment(date)}
                        year='numeric'
                        month='long'
                        day='2-digit'
                    />
                }} description="Medications for Today" />}
                      extra={<div><Button.Group><Tooltip title={<FormattedMessage id="plan.prev_day" defaultMessage="Previous day" />}><Button size="small" onClick={() => this.showDate('prev')}><Icon type="left" /></Button></Tooltip><Tooltip title={<FormattedMessage id="plan.next_day" defaultMessage="Next day" />}><Button size="small" onClick={() => this.showDate('next')}><Icon type="right" /></Button></Tooltip></Button.Group>
                          <Button.Group style={{marginLeft:10}}>
                              {/*<Tooltip title="Summary"><Button size="small" onClick={this.toggleSummary}><Icon type="area-chart"  /></Button></Tooltip>*/}
                              <Tooltip title="Chat"><Button size="small" ><Icon type="message"  /></Button></Tooltip>
                              <Tooltip title="Settings"><Dropdown overlay={menu}  >
                                  <Button size="small" ><Icon type="setting" /></Button>
                                  </Dropdown></Tooltip>
                          <Tooltip title={<FormattedMessage id="medication.add" defaultMessage="Add Medication" />} placement={'top'}><Popover content={<MedicationSelect userId={user_id} onSelect={this.addMedication} />} title="Add Medication" trigger="click" placement={'bottom'} ><Button size={"small"} ><Icon type="plus"  /></Button></Popover></Tooltip>
                          </Button.Group>
                      </div>}>

                    {takeAtTimes.length === 0 && takeDaily.length === 0 && takeAsNeeded.length === 0 && <div className="ant-list-empty-text">No Medications</div>}
                    {takeAtTimes.length > 0 &&
                        (   <div><Divider><FormattedMessage id="plan.medication.at_times" defaultMessage="Take At Times" /></Divider>
                                <Table columns={columns} dataSource={data} /*scroll={{x: 600}}*/ pagination={false} />
                            </div>
                        )
                    }
                    {takeDaily.length > 0 &&
                        (<div>
                        <Divider><FormattedMessage id="plan.medication.daily" defaultMessage="Take Daily" /></Divider>
                            <Table columns={takeDailyColumns} dataSource={takeDailyData} /*scroll={{x: 600}}*/ pagination={false} showHeader={false} />
                       </div>)
                    }
                    {takeAsNeeded.length > 0 &&
                    (<div>
                        <Divider><FormattedMessage id="plan.medication.as_needed" defaultMessage="Take As Needed" /></Divider>
                        <Table columns={takeAsNeededColumns} dataSource={takeAsNeededData} /*scroll={{x: 600}}*/ pagination={false} showHeader={false} />
                        </div>)
                    }

                    {this.state.showSummary && <MedicationSummary userId={user_id} date={date} onCancel={this.toggleSummary} />}

                    {this.state.addModal &&
                        <MedicationAddForm drugId={this.state.medId}
                                            userId={user_id}
                                            date={date}
                                            title={<FormattedMessage id="plan.medication.add" defaultMessage="Add" description="Add Medication" />}
                                            onCancel={this.hideAddMedication} />}
                    {this.state.showMotivatorsModal && <Modal
                        visible={true}
                        destroyOnClose
                        footer={false}

                        maskClosable = {false}
                        keyboard = {false}
                        onCancel={this.toggleMotivators}
                        title={'Motivators'}

                    ><Motivators user_id={user_id} /></Modal>}
            </Card>
            )
    }
}



export default MedicationPlanBody
