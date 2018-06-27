import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';

export const UserActionPlansTable = props => {


    const {items=[], loading=false} = props;
    const total = items.length;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <Truncate lines={1}>{title}</Truncate>;
        },
    },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            width:120,
            render: (createdDate) => {
                return moment(createdDate).format('L')
            },
        }

    ];
    const dataSource = items.map((info, i) => {
        //const {id, plan} = info;

        return {...info, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic1  ant-card-type-table" title={'Family History '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserActionPlansTable;