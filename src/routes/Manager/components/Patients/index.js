import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Button,Radio, Icon, Tooltip} from 'antd';
import TableCustom from './components/Tables'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
 const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Patients"><Link to='/pb'><Button type={'primary'}><Icon type="plus"  /></Button></Link></Tooltip>
    </React.Fragment>;

export default class Patients extends React.Component {

    render() {
        const {loading} = this.props;

        if (loading) {
            return <div>Loading...</div>
        }
       
        const plansTotal = this.props.total;
        return (
            <PageHeaderLayout title={'Patients'+ (plansTotal > 0 ? ' ('+plansTotal+')' : '')}
                          content="You can view and manage tumor boards here"
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                              mainAffix
                          >

            <Card type="table">
                <TableCustom patients={this.props.patients}/>
            </Card>
            </PageHeaderLayout>);
    }
}