import React from 'react';
import {Table, DatePicker, Button} from 'antd';
import moment from "moment/moment";
import Loading from 'components/Loading';


export default class Records extends React.Component{
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    componentDidMount() {
       /* this.table.addEventListener('scroll', (event) => {
            let maxScroll = event.target.scrollHeight - event.target.clientHeight
            let currentScroll = event.target.scrollTop
            if (currentScroll === maxScroll) {
                // load more data
            }
        })*/
        /*var tableContent = document.querySelector('.ant-table-body')
        tableContent.addEventListener('scroll', (event) => {
            let maxScroll = event.target.scrollHeight - event.target.clientHeight
            let currentScroll = event.target.scrollTop
            if (currentScroll === maxScroll) {
                // load more data
            }
        })*/
    }

    render() {
        const {loading} = this.props;

        if (loading) {
            return <Loading />;
        }
        const {healthRecords} = this.props;
        let { sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};

        const dataSource = healthRecords.map((info,i) => {
            return {...info, key:i};
        });
        /*const dataSource = [{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
        }];*/

        /*
        id
                type
                title
                createdAt
                isActive
                riskLevel
         */

        const columns = [{
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'Medication', value: 'Medication' },
                { text: 'Diagnosis', value: 'diagnosis' },
                { text: 'Condition', value: 'condition' },
                { text: 'Lab Result', value: 'lab_result' },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.length - b.type.length,
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        },  {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text,info) => {return info.isActive ? 'Active': 'Inactive'},
            filters: [
                { text: 'Active', value: true },
                { text: 'InActive', value: false },
            ],
            /*filteredValue: filteredInfo.isActive || null,*/
            onFilter: (value, record) => record.isActive.includes(value),
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
            filterDropdown: (
                <div className="ant-table-filter-dropdown" style={{padding:5}}>
                    <DatePicker
                        placeholder="From"
                    />
                    <DatePicker
                        placeholder="To"
                    />
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                </div>
            ),
        }];
        return (
            <div>
                {/*<div style={{textAlign:'right', 'marginBottom':10}}>
                    <Button size="small" icon="plus">Add</Button>
                </div>*/}
                {dataSource.length > 0 ?
            <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange} ref={(input) => { this.table = input; }} />
                    :
                    <div className="ant-list-empty-text">No Health Records</div>}
            </div>
                );
    }
}