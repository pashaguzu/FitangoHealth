import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import Truncate from 'react-truncate';

const getTitleByType = type => {

    let title = 'Title';
   // console.log(type);
    switch(type) {
        case 'diagnosis':
            title = 'Diagnosis';
            break;
        case 'treatment':
            title = 'Treatment';
            break;
        case 'medication':
            title = 'Medication';
            break;
        case 'allergy':
            title = 'Allergy';
            break;
        case 'med_allergy':
            title = 'Medication Allergy';
            break;
    }
    return title;

}
export const HealthItemsTable = props => {

    const {items=[], total=0, loading=false, title="", type} = props;

    const colTitle = getTitleByType(type);
    const columns = [{
        title: colTitle,
        dataIndex: 'title',
        key: 'title',
        render: (title, info) => {
            return <Truncate  lines={1} >{title}</Truncate>;
        },
    },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            width:100,
            render: (createdDate) => {
                return moment(createdDate).format('L')
            },
        }

    ];
    const dataSource = items.map((items, i) => {
        return {...items, key:i};
    });
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="  ant-card-type-table" title={title+' '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default HealthItemsTable;