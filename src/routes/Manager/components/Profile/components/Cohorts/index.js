import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort';
export const CohortsTable = props => {

    const {cohorts=[], loading=false} = props;
    const total = cohorts.length;
    const columns = [
        {
            title: 'Cohort',
            key: 'title',
            render: (info) => {
                return <Truncate lines={1} >{info.cohort.title}</Truncate>
            },
            sorter: (a, b) => sort(a,b,"cohort","title"),
        },
        {
            title: 'Code(s)',
            dataIndex: 'cohort',
            key: 'status',
            render: (cohort) => {
                return <Truncate lines={1} >{cohort.codes.map(code => {
                    return code.code;
                })}</Truncate>
            },
        },
        {
            title: 'Date Added',
            dataIndex: 'startDate',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.startDate-b.startDate,
        },

    ];
    const dataSource = cohorts;
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Cohorts '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default CohortsTable;