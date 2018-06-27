import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Table, Icon, Button, Radio, Tooltip} from 'antd';
import TableCustom from './components/Table'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const actions = <React.Fragment>
<RadioGroup defaultValue="all" style={{marginRight: 10}}>
    <RadioButton value="all">All</RadioButton>
    <RadioButton value="open">Open</RadioButton>
    <RadioButton value="past">Past</RadioButton>
</RadioGroup>
<Tooltip title="Add New Pathway"><Link to='/pb/type/pathway'><Button type="primary"><Icon
    type="plus"/></Button></Link></Tooltip>

</React.Fragment>;
export default class Pathways extends React.Component {

    render() {
        const {loading} = this.props;
        if (loading) {
            return <div>Loading...</div>
        }
        const {pathways, total, searchText, emitEmpty, onSearch} = this.props;
     

        return (
            <PageHeaderLayout title={'Pathways ' + (total > 0 ? ' (' + total + ')' : '')}
                              content=""
                              action={actions}
            >

                <Card type="table">
                    <TableCustom pathways={pathways} searchText={searchText} emitEmpty={emitEmpty} onSearch={onSearch}/>
                </Card>
            </PageHeaderLayout>);
    }
}