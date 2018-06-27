import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import sort from '../../../../../../components/Tables/sort'
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";

export const AssessmentsTable = props => {

    const {assessments=[], loading=false} = props;
    const total = assessments.length;
    const columns = [
        {
            title: 'Name',
            key: 'title',
            render: (info) => {
                return <Truncate lines={1} >{info.assessment.name}</Truncate>
            },
            sorter: (a, b) => sort(a,b,"assessment","name"),
        },

        {
            title: 'Started',
            dataIndex: 'createdOn',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.createdOn - b.createdOn,
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            render: (progress) => {
                return progress+'%';
            },
        },
        {
            title: 'Completed',
            key: 'completed',
            render: (info) => {
                return info.isCompleted? moment(info.completedOn).format('L') : '';
            },
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },

    ];
    const dataSource = assessments;
    const pageOpts = {
        //onChange: changePage,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Assessments '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default AssessmentsTable;