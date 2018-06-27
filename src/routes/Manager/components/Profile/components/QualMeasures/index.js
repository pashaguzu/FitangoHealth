import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort';
export const QualMeasuresTable = props => {

    const {qms=[], loading=false} = props;
    const total = qms.length;
    const columns = [
        {
            title: 'Measure',
            key: 'title',
            render: (info) => {
                return <Truncate lines={1} >{info.qualityMeasure.title}</Truncate>
            },
            sorter: (a, b) => sort(a,b,"qualityMeasure","title"),

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Closed',
            dataIndex: 'date',
            key: 'date',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.date - b.date,
        },

    ];
    const dataSource = qms;
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Quality Measures '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default QualMeasuresTable;