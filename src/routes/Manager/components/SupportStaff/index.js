import React from 'react';
import {Row, Col, Layout, Table, Radio, Card, Menu, Icon, Divider, Alert, Button, Dropdown, Tooltip} from 'antd';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../User/components/AvatarWithName/index";
import SupportStaffManager from "./containers/SupportStaffManager";
import sort from '../../../../components/Tables/sort';
import InviteButton from "../../../../components/Tables/InviteButton/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const SupportStaff = props => {
    const {management = [], openModal, totalCount, selectedCount, showButton, openShowButton, hideShowButton, visibleModal, hideModal, loading = false} = props;
    const {edges} = management;
    const columns = [{
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        render: (user) => {
            console.log(user);
            return <AvatarWithName user={user}/>
        },
        sorter: (a, b) => sort(a.user, b.user, "fullName"),
    },
        {
            title: 'Position',
            dataIndex: 'roleTitle',
            key: 'roleTitle',
            render: (roleTitle) => {
                return roleTitle
            },
            sorter: (a, b) => a.roleTitle - b.roleTitle,
        },
        {
            title: 'Phone',
            dataIndex: 'user',
            key: 'phone',
            render: (user) => {
                return user.phone.number;
            },
        },
        {
            title: 'Last Login',
            dataIndex: 'lastLoginDate',
            key: 'lastLoginDate',
            render: (lastLoginDate) => {
                return lastLoginDate;
            },
        },

    ];
    const pageOpts = {
        pageSize: 20,
        total: totalCount,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight: 10}}>
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Invite"><Button onClick={openModal} type="primary"><Icon type="plus"/></Button></Tooltip>
    </React.Fragment>;
    const rowSelection = {
        onChange: record => (
            record.length < 1 ? hideShowButton() : openShowButton(record.length)

        ),
        getCheckboxProps: record => ({
            name: record.name,
        }),
    };
    return (
        <PageHeaderLayout title={'Support Staff ' + (totalCount > 0 ? ' (' + totalCount + ')' : '')}
                          content="You can view and manage tumor boards here"
                          action={actions}
        >

            <Card type="basic1  ant-card-type-table">
                <Table rowSelection={rowSelection} size="middle" dataSource={edges} rowKey={'id'} columns={columns}
                       pagination={pageOpts} loading={loading}/>
                {showButton && <InviteButton selectedCount={selectedCount}/>}
            </Card>
            {visibleModal && <SupportStaffManager onHide={hideModal}/>}
        </PageHeaderLayout>
    );
}
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
    withHandlers({
        openModal: props => () => {
            props.setOpenManager(true);
        },
        hideModal: props => () => {
            props.setOpenManager(false);
        }
    })
);

export default enhance(SupportStaff);