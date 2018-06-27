import React from 'react';
import PropTypes from 'prop-types';

import { Table, Spin,  Modal} from 'antd';
import {AreaChart, Area, XAxis, CartesianGrid, Tooltip} from 'recharts';
import moment from "moment/moment";


const data = [
    {date: '2010-01-01', medications: [{id:'one',reported:5, total:10}, {id:'two',reported:2, total:2}]},
    {date: '2010-01-02', medications: [{id:'one',reported:4, total:10}, {id:'two',reported:1, total:2}]},
    {date: '2010-01-03', medications: [{id:'one',reported:9, total:10}, {id:'two',reported:0, total:2}]},
    {date: '2010-01-04', medications: [{id:'one',reported:10, total:10}, {id:'two',reported:0, total:0}]},
    {date: '2010-01-05', medications: [{id:'one',reported:9, total:10}, {id:'two',reported:0, total:0}]},
];

class MedicationSummary extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date:props.date
        };
        this.getValue = this.getValue.bind(true);
        this.formatDate = this.formatDate.bind(true);
        this.getDataForTable = this.getDataForTable.bind(true);
    };

    static propTypes = {
        userId: PropTypes.string,
        date: PropTypes.string,

    }

    static defaultProps = {
        date: '',
        width:500,
    }

    formatDate(value) {
        return moment(value).format('M/D');
    }

    getDataForTable() {
        /*let datesForColumns = [];
        let row = [];
        data.map((dateInfo) => {
            // get all the dates for columns.
            datesForColumns.push(dateInfo.date);
            const medications = dateInfo.medication;

            //a.filter( onlyUnique );
            medications.map((medication) => {
                // create a list of all medications
                row.push({''});
            });

        });


        const row = {'name':'8-med', '01':{'reported':1,'total':10},'02':{'reported':2,'total':34}};

        return medicationsList;*/
    }

    getValue(info) {
        const medications = info.medications;
        let total = null;
        let items = 0;

        medications.map((medication) => {
            if (medication.total > 0 ) {
                const medTotal = Math.floor(medication.reported / medication.total * 100);


                // return total;
                total += medTotal;
                items++;
            }
            return medication;
        })
        return Math.round(total/items);//report.value || null;
    }




    render() {

        const {loading} = this.props;
        if (loading) {
            return   <Modal
                visible={true}
                closable={false}
                destroyOnClose
                footer={false}
                bodyStyle={{height:150, textAlign:'center', lineHeight:5}}
            >
                <Spin tip="Loading..." />
            </Modal>
        }

        //const dates = ['01','02','03'];



        /*

const data = [
    {date: '2010-01-01', medications: [{id:'one',reported:5, total:10}, {id:'two',reported:2, total:2}]},
    {date: '2010-01-02', medications: [{id:'one',reported:4, total:10}, {id:'two',reported:1, total:2}]},
    {date: '2010-01-03', medications: [{id:'one',reported:9, total:10}, {id:'two',reported:0, total:2}]},
    {date: '2010-01-04', medications: [{id:'one',reported:10, total:10}, {id:'two',reported:0, total:0}]},
    {date: '2010-01-05', medications: [{id:'one',reported:9, total:10}, {id:'two',reported:0, total:0}]},
];
         */
        let datesForColumns = [];
        let medicationsRows = [];
        data.map((dateInfo) => {
            // get all the dates for columns.
            const date = dateInfo.date;
            datesForColumns.push(date);
            const medications = dateInfo.medications;

            //a.filter( onlyUnique );

            //const unique = [...new Set(medications.map(item => item.id))];


            // checking medications
            medications.map((medication) => {

                //{'reported':medication.reported, 'total': medication.total}

                //medicationsWithReportsByDay.push({})
                //medicationsWithReportsByDay.
                // create a list of all unique medications and append to them our results
                //medicationsRows.push({'id':medication.id});
                return medication;
            });
            return dateInfo;
        });


        //const row = {'name':'8-med', '01':{'reported':1,'total':10},'02':{'reported':2,'total':34}};

        //return medicationsList;


        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }];

        datesForColumns.map((date, i)=> {
            columns.push({
                title: date,
                dataIndex: date,
                key: i,
            });
            return date;
        });

        return (<Modal
            visible={true}
            destroyOnClose
            footer={false}

            maskClosable = {false}
            keyboard = {false}
            onCancel={this.props.onCancel}
            title={'Medications Summary'}

        ><AreaChart width={500} height={200} data={data}
                           margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="date"  tickFormatter={this.formatDate} tickCount={7} interval="preserveStartEnd" />
            {/*<YAxis/>*/}
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='monotone' dataKey={this.getValue} stroke='#8884d8' fill='#8884d8' />
        </AreaChart>

            <Table dataSource={medicationsRows} columns={columns} />
        </Modal>);
    }
}

export default MedicationSummary;