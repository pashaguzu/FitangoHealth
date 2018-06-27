import React from 'react';
import {Table, DatePicker, Button} from 'antd';
import {branch, renderComponent, compose, withHandlers, withState} from 'recompose';
import DiagnosisManager from './containers/DiagnosisManager';
import moment from "moment/moment";
import Loading from 'components/Loading';
import Truncate from 'react-truncate';


class Diagnoses extends React.Component{
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {

        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    render() {
        const {loading, userId, size=''} = this.props;

        if (loading) {
            return <Loading />;
        }
        const {diagnoses, toggleAdd} = this.props;
        let { sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};

        const dataSource = diagnoses.map((info,i) => {
            return {...info, key:i};
        });
        /*const dataSource = [{
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street'
        }, {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street'
        }];*/

        /*
        id
                type
                title
                createdAt
                isActive
                riskLevel
         */

        const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text,info) => {return <DiagnosisTitle {...info} userId={userId} /> },
        },  {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text,info) => {return info.isPrimary ? 'Current': ''},
            // filters: [
            //     { text: 'Active', value: true },
            //     { text: 'Inactive', value: false },
            // ],
            // /*filteredValue: filteredInfo.isActive || null,*/
            // onFilter: (value, record) => record.isActive.includes(value),
            // sorter: (a, b) => a.isActive - b.isActive,
            // sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
        }, {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'date',
            render: (info) => moment(info).format('L'),
            // filterDropdown: (
            //     <div className="ant-table-filter-dropdown" style={{padding:5}}>
            //         <DatePicker
            //             placeholder="From"
            //         />
            //         <DatePicker
            //             placeholder="To"
            //         />
            //         <Button type="primary" onClick={this.onSearch}>Search</Button>
            //     </div>
            // ),
        }];
        return (
            <div>
                {<div style={{textAlign:'right', 'marginBottom':10}}>
                    <Button size="small" icon="plus" onClick={toggleAdd}>Add</Button>
                </div>}
                {dataSource.length > 0 ?
            <Table dataSource={dataSource} size={size} columns={columns} pagination={false} onChange={this.handleChange} ref={(input) => { this.table = input; }} />
                    :
                    <div className="ant-list-empty-text">No Diagnoses</div>}
            </div>
                );
    }
}

const DiagnosisTitle = compose(
    withState('showEdit', 'setShowEdit', false),
    withHandlers({
        onEdit: props => () => {
            //console.log(props);
            props.setShowEdit(true);
        },
        onHide: props => () => {
            // hide add Modal
            props.setShowEdit(false);
        },
    }),
    branch(props => props.showEdit, renderComponent(DiagnosisManager))
)(({title, onEdit}) => {
    return <a onClick={onEdit}><Truncate lines={2}> {title}</Truncate></a>;
});

const enhance = compose(
    withState('showAdd', 'setShowAdd', false),
    withHandlers({
        toggleAdd: props => () => {
            props.setShowAdd(!props.showAdd);
        },
        onHide: props => () => {
            // hide add Modal
            props.setShowAdd(false);
        },
        onEdit: props => () => {

        }
    }),
    branch(props => props.showAdd, renderComponent(DiagnosisManager))
)

export default enhance(Diagnoses);