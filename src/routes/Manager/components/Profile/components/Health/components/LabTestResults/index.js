import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';

export const LabResultsTable = props => {

    const {items=[], total=0, loading=false, title=""} = props;
    const columns = [{
        title: 'Name',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <Truncate lines={1} >{title}</Truncate>;
        },
    },
        {
            title: 'Date',
            dataIndex: 'testDate',
            key: 'testDate',
            render: (createdDate) => {
                return moment(createdDate).format('L')
            },
        }];
    const dataSource = items.map((items, i) => {
        return {...items, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Lab Results '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default LabResultsTable;