import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Menu, Dropdown, Card, Table, DatePicker, Button, Icon, Tooltip} from 'antd';
import './index.css'
import sort from '../../../../../../components/Tables/sort'

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
        data: this.props.pathways,
    };

    static defaultProps = {
        pathways: [],
        total: 0
    }

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render() {
        const {loading} = this.props;
        let {sortedInfo} = this.state;
        console.log(this.props);
        const suffix = this.props.searchText ? <Icon type="close-circle" onClick={this.props.emitEmpty}/> : null
        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
        },
            {
                title: 'Cancer',
                dataIndex: 'cancer',
                key: 'cancer',
                render: (text, info) => {
                    return info.cancer.title || ''
                },
                sorter: (a, b) => sort(a, b, "cancer"),
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'statusText',
                render: (text, info) => {
                    return info.status === '1' ? 'Published' : 'Draft';
                },
                sorter: (a, b) => sort(a, b, "status"),
            },
            {
                title: 'Created',
                dataIndex: 'createdOn',
                key: 'date',
                render: (info) => moment(info).format('L'),
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
            },
            {
                title: 'By',
                dataIndex: 'creator',
                key: 'creator',
                render: (user, info) => {
                    return <Link to={'/u/' + info.creator.id}>{info.creator.fullName}</Link>
                },
                sorter: (a, b) => sort(a, b, "creator"),
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
            },
        ];

        const dataSource = this.props.pathways;
        return (
            <Table dataSource={dataSource} loading={loading} columns={columns} pagination={false}
                   onChange={this.handleChange}
                   ref={(input) => {
                       this.table = input;
                   }}/>
        )

    }
}