import React from 'react';
import {Card, Input, Radio, Tooltip, DatePicker, Button, Icon, Table} from 'antd';
import Truncate from 'react-truncate';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import moment from 'moment';
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import './index.css'
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import sort from '../../../../../../components/Tables/sort';
import ProvirdersManager from './containers/ProvidersManager';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';
export const UserProvidersTable = props => {

    const {providers = [], onSearch, emitEmpty, loading = false, searchText, openModal, visibleModal, hideModal, filterDropdownVisible = true, onChange} = props;
    const total = providers.length;
    const suffix = searchText ? <Icon type="close-circle" onClick={emitEmpty}/> : null
    console.log(searchText, providers);
    const columns = [{
        title: 'Name',
        key: 'name',
        render: (info) => {
            return <Truncate lines={1}>{info.provider.name}</Truncate>
        },
        sorter: (a, b) => sort(a, b, "provider", "name"),
        filterDropdown: (
            <div className="custom-filter-dropdown">
                <Input
                    suffix={suffix}
                    ref={ele => this.searchInput = ele}
                    placeholder="Search name"
                    value={searchText}
                    onChange={onSearch}
                    onPressEnter={onSearch}
                />
            </div>
        ),
        filterIcon: <Icon type="search"/>,
        // filterDropdownVisible: this.state.filterDropdownVisible,
    },
        {
            title: 'Added',
            key: 'sender',
            render: (info) => {
                return <AvatarWithName user={info.sender}/>
            },
            sorter: (a, b) => sort(a, b, "sender"),
        },
        {
            title: 'On',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
            render: (date) => {
                return moment(date).format('L')
            },
            sorter: (a, b) => a.joinedDate - b.joinedDate,
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <RangePicker
                        onChange={onChange}
                        ranges={{'This Year': [moment(), moment().endOf('year')]}}
                        defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                        format={dateFormat}
                    />
                </div>
            ),
            filterIcon: <Icon type="filter"/>,
        },

    ];

    const dataSource = providers;
    const pageOpts = {
        //onChange: changePage,
        pageSize: 5,
        total: total,
        hideOnSinglePage: true
    };
    const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight: 10}}>
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Providers"><Button onClick={openModal}><Icon type="plus"/></Button></Tooltip>

    </React.Fragment>;


    return (<PageHeaderLayout title={'Providers ' + (total > 0 ? ' (' + total + ')' : '')}
                              content=""
                              action={actions}
    >

        <Card type="basic1  ant-card-type-table">
            <Table size="middle" dataSource={dataSource} rowKey={'id'} columns={columns} pagination={pageOpts}
                   loading={loading}/>
        </Card>
        {visibleModal && <ProvirdersManager onHide={hideModal}/>}
    </PageHeaderLayout>)
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
export default enhance(UserProvidersTable);