import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Dropdown, Menu, Slider, Input, Button, Icon, Modal} from 'antd';
import CustomModal from '../../containers/Modal'
import Truncate from 'react-truncate';
import sort from '../../../../../../components/Tables/sort'
import './index.css'

export default class TableCustom extends React.Component {

    state = {
        // for search
        filterDropdownVisible: false,
        settingDropdownVisible: false,
        searchText: '',
        filtered: false,
        //
        filteredInfo: null,
        sortedInfo: {},
        data: this.props.patients,
        visible: false,
        id: null
    };

    static defaultProps = {
        plans: [],
        plansTotal: 0
    }
    onSearch = () => {
        const {searchText} = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
            filterDropdownVisible: false,
            filtered: !!searchText,
            data: this.props.patients.map((record) => {
                const match = record.fullName.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    fullName: (
                        <span>
              {record.fullName.split(reg).map((text, i) => (
                  i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
                    ),
                };
            }).filter(record => !!record),
        });
    }

    onInputChange = (e) => {
        this.setState({searchText: e.target.value});
    }
    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }
    sliderChange = (value) => {
        this.setState({
            data: this.props.patients.map((record) => {
                return {
                    ...record,
                    age: (
                        (record.age > value[0] && record.age < value[1]) ? record.age : null

                    ),
                };
            }).filter((data) => {
                return data.age != null
            }),
        });
    }
    showModal = (id) => {
        this.setState({
            visible: true,
            id: id
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const {loading} = this.props;
        let {sortedInfo} = this.state;
        const marks = {
            0: '0',
            99: '99'
        };
        const columns = [
            {
                title: "Name",
                dataIndex: 'fullName',
                key: 'fullName',
                render: (title, info) => {
                    return <Link to={'/u/' + info.id}>{title}</Link>;
                },
                sorter: (a, b) => sort(a, b, "fullName"),
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            value={this.state.searchText}
                            onChange={this.onInputChange}
                            onPressEnter={this.onSearch}
                        />
                        <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                        filterDropdownVisible: visible,
                    }, () => this.searchInput && this.searchInput.focus());
                },
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age,
                filterDropdown: (
                    <div style={{width: 200, height: 60}} className="custom-filter-dropdown">
                        <Slider marks={marks} range defaultValue={[20, 50]} onChange={this.sliderChange}/>
                    </div>
                ),
                filterIcon: <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>,
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
                render: (gender) => {
                    return gender[0].toUpperCase()
                },
                filters: [{
                    text: 'male',
                    value: 'male',
                }, {
                    text: 'female',
                    value: 'female',
                }],
                onFilter: (value, record) => record.gender.indexOf(value) === 0,
            },
            {
                title: 'Dignosis',
                dataIndex: 'getDiagnosis',
                key: 'getDiagnosis',
                render: (getDiagnosis) => {
                    if (getDiagnosis) {
                        return <Truncate lines={2}>{getDiagnosis.code.name.slice(0, 90)}</Truncate>
                    }
                },
            }, {
                title: 'Actions',
                render: (info) => {
                    const menu = (
                        <Menu>
                            <Menu.Item onClick={this.showModal.bind(this, info.id)}>
                                <Icon type="edit"/> Edit
                            </Menu.Item>
                        </Menu>
                    );
                    return <Dropdown overlay={menu} trigger={['click']}>
                        <Icon type="setting"/>
                    </Dropdown>;
                }
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                name: record.name,
            }),
        };
        const dataSource = this.state.data;
        return (
            <div>
                <Modal
                    title="Edit user"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                >
                    <CustomModal id={this.state.id}/>
                </Modal>
                <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false}
                       onChange={this.handleChange}
                       ref={(input) => {
                           this.table = input;
                       }}/>
            </div>);
    }
}