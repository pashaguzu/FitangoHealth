import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Menu, Dropdown, DatePicker, Table, Button, Icon, Tooltip} from 'antd';
import sort from '../../../../../../components/Tables/sort'
import './index.css'

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY/MM/DD';


export default class TableCustom extends React.Component {
    state = {
        // for search
        filterDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
        data: this.props.plans,
    };

    static defaultProps = {
        plans: [],
        plansTotal: 0
    }

    handleChange = (pagination, filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    render() {
        const {loading} = this.props;
        let {sortedInfo} = this.state;
        const suffix = this.props.searchText ? <Icon type="close-circle" onClick={this.props.emitEmpty}/> : null
        console.log(this.props.plans);
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            //sorter: (a, b) => a.title.length - b.title.length,
            render: (title, info) => {
                return <Link to={'/pb/' + info.id}>{title}</Link>
            },
            sorter: (a, b) => sort(a, b, "title"),
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        suffix={suffix}
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        value={this.props.searchText}
                        onChange={this.props.onSearch}
                        onPressEnter={this.props.onSearch}
                    />
                </div>
            ),
            filterIcon: <Icon type="search"/>,
        }, {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, info) => {
                return info.isActive ? 'Active' : 'Inactive'
            },
            filters: [
                {text: 'Active', value: true},
                {text: 'Inactive', value: false},
            ],
            onFilter: (value, record) => {
                console.log(value, record)
            },
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
            sorter: (a, b) => a.createdAt - b.createdAt,
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <RangePicker
                        onChange={this.onChange}
                        defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                        format={dateFormat}
                    />
                </div>
            ),
            filterIcon: <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
        }, {
            title: 'Actions',

            render: (info) => {
                const menu = (
                    <Menu>
                        <Menu.Item>
                            <Icon type="edit"/> Edit
                        </Menu.Item>
                        <Menu.Item>
                            <Icon type="delete"/> Delete
                        </Menu.Item>
                    </Menu>
                );
                return <Dropdown overlay={menu} trigger={['click']}>
                    <Icon type="setting"/>
                </Dropdown>;
            }
        },];

        const dataSource = this.props.plans;

        return (
            <Table dataSource={dataSource} columns={columns} pagination={false} onChange={this.handleChange}
                   ref={(input) => {
                       this.table = input;
                   }}/>
        )
    }
}