import React from 'react';
import moment from 'moment';
import {Table, Input, Button, Icon, Tooltip, Radio} from 'antd';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Actionplans extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: {},
    };

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {

        let {sortedInfo} = this.state;
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        }, {
            title: 'Created',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            /*render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'InActive', value: false},
            ],
            onFilter: (value, record) => record.isActive.includes(value),
            sorter: (a, b) => a.isActive - b.isActive,
            sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,*/
        }, {
            title: 'By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            sorter: (a, b) => a.createdBy - b.createdBy,
            //render: (info) => moment(info).format('L'),
        }, {
            title: 'Downloads',
            dataIndex: 'downloads',
            key: 'downloads',
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }];

        const dataSource = [];
        const total = 0;
        const actions = <React.Fragment>
            <RadioGroup defaultValue="all" style={{marginRight: 10}}>
                <RadioButton value="all">All</RadioButton>
                <RadioButton value="open">Open</RadioButton>
                <RadioButton value="past">Past</RadioButton>
            </RadioGroup>
            <Tooltip title="Add New Workflow"><Button type="primary"><Icon type="plus"/></Button></Tooltip>

        </React.Fragment>;
        return (
            <React.Fragment>
                <PageHeaderLayout title={'Workflow ' + (total > 0 ? ' (' + total + ')' : '')}
                                  content="You can view and manage tumor boards here"
                                  action={actions}
                >

                    <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                           ref={(input) => {
                               this.table = input;
                           }}/>
                </PageHeaderLayout>
            </React.Fragment>);
    }
}