import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Input, Menu, Dropdown, Radio, Card, Table, Button, Icon, Tooltip} from 'antd';
import TableCustom from './components/Table';
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
    const actions = <React.Fragment>
            <RadioGroup defaultValue="all" style={{marginRight: 10}}>
                <RadioButton value="all">All</RadioButton>
                <RadioButton value="open">Open</RadioButton>
                <RadioButton value="past">Past</RadioButton>
            </RadioGroup>
            <Tooltip title="Add New ActionPlan"><Link to='/pb'><Button type="primary"><Icon
                type="plus"/></Button></Link></Tooltip>
        </React.Fragment>;

export default class ActionPlans extends React.Component {


    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }

        const plansTotal = this.props.plansTotal;
        const {searchText, emitEmpty, onSearch} = this.props;
    

        return (
            <PageHeaderLayout title={'ActionPlans Boards ' + (plansTotal > 0 ? ' (' + plansTotal + ')' : '')}
                              content=""
                              action={actions}
            >
                <Card type="table">
                    <TableCustom plans={this.props.plans} searchText={searchText} emitEmpty={emitEmpty}
                                 onSearch={onSearch}/>
                </Card>
            </PageHeaderLayout>);
    }
}