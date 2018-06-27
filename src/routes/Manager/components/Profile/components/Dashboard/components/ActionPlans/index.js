import React from 'react';
import {Card, Table} from 'antd';
import EllipsisText from 'react-ellipsis-text';

export const UserActionPlansTable = props => {

    const {plans=[], loading=false} = props;
    const total = plans.length;
    const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <EllipsisText text={title} length={45}  />
        },
    },

    ];
    const dataSource = plans.map((info, i) => {
        const {id, plan} = info;

        return {id, title: plan.title, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic1  ant-card-type-table" title={'ActionPlans '+ (total > 0 ? ' ('+total+')' : '')} >
            <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default UserActionPlansTable;