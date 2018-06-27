import React from 'react';
import {Card, Table, Progress} from 'antd';
import EllipsisText from 'react-ellipsis-text';
import moment from 'moment';

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
        {
            title: 'Start',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (date) => {
                return moment(date).format('L')
            },
        },
        {
            title: 'End',
            dataIndex: 'endDate',
            key: 'endDate',
            render: (date) => {
                return date && moment(date).format('L')
            },
        },
        {
            title: 'Engagement',
            dataIndex: 'adherence',
            key: 'adherence',
            render: (adherence={}) => {
                const {level} = adherence;
                return level && <Progress percent={level} />;
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
    return (<Card type="basic  ant-card-type-table" title={'Plans Of Care '+ (total > 0 ? ' ('+total+')' : '')} >
            <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
        </Card>)
}

export default UserActionPlansTable;