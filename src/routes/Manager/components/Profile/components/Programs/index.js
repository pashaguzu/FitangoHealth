import React from 'react';
import {Card, Table} from 'antd';
import Truncate from 'react-truncate';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import sort from '../../../../../../components/Tables/sort'

export const UserProvidersTable = props => {

    const {programs=[], loading=false} = props;
    const total = programs.length;
    const columns = [{
        title: 'Name',
        key: 'title',
        render: (info) => {
            return <Truncate lines={1} >{info.provider.name}</Truncate>
        },
    },
        // {
        //     title: 'Category',
        //     key: 'category',
        //     render: (info) => {
        //         return 1
        //     },
        // },
        {
            title: 'Accepted',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.joinedDate-b.joinedDate,

        },

        {
            title: 'By',
            dataIndex: 'sender',
            key: 'sender',
            render: (user) => {
                return <AvatarWithName user={user}/>
            },
            sorter: (a, b) => sort(a,b,"sender"),
        },

    ];
    const dataSource = programs;
    const pageOpts = {
        //onChange: changePage,
        pageSize:5,
        total: total,
        hideOnSinglePage: true
    };
    return (<Card type="basic  ant-card-type-table" title={'Referrals '+ (total > 0 ? ' ('+total+')' : '')} >
        <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts} loading={loading} />
    </Card>)
}

export default UserProvidersTable;