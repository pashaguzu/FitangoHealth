import React from 'react';
import {Input, Card,Table, Radio, Button, Icon, Tooltip} from 'antd';
import {compose, withState, withHandlers, withStateHandlers} from 'recompose';
import ChemotherapyManager from './containers/ChemotherapyManager';
import sort from '../../../../components/Tables/sort'
import {PageHeaderLayout} from "../../../../components/Layout/PageHeaderLayout/index";
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CancerTitlePure = ({chemotherapy, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openEditorModal}>{chemotherapy.title}</a>
        {openEditor &&  <ChemotherapyManager onHide={hideEditorModal} chemotherapy={chemotherapy} />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
            openEditor: false,
        }),
        {
            openEditorModal: ({ counter }) => (value) => ({
                openEditor: true
            }),
            hideEditorModal: ({ counter }) => (value) => ({
                openEditor: false
            }),
        }
        )
);
const CancerTitle = enhanceTitle(CancerTitlePure);

const ChemotherapiesPure = props => {
    const {cancers=[], total, openManage, addCancer, hideManager} = props;
    const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter:(a, b) => sort(a,b,"title"),
             render: (title, info) => {
                 return <CancerTitle chemotherapy={info}/>;
             },
            // // search
            // filterDropdown: (
            //     <div className="custom-filter-dropdown">
            //         <Input
            //             ref={ele => this.searchInput = ele}
            //             placeholder="Search name"
            //             value={this.state.searchText}
            //             onChange={this.onInputChange}
            //             onPressEnter={this.onSearch}
            //         />
            //         <Button type="primary" onClick={this.onSearch}>Search</Button>
            //     </div>
            // ),
            // filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            // filterDropdownVisible: this.state.filterDropdownVisible,
            // onFilterDropdownVisibleChange: (visible) => {
            //     this.setState({
            //         filterDropdownVisible: visible,
            //     }, () => this.searchInput && this.searchInput.focus());
            // },
        }];
    const dataSource = cancers.map((cancer, i) => ({...cancer, key:i}))
    const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} >
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <Tooltip title="Add New Chemotherapy"><Button size="small" onClick={addCancer}><Icon type="plus" /></Button></Tooltip>
    </React.Fragment>;

    return (<React.Fragment>
         <PageHeaderLayout title={'Chemotherapies'+ (total > 0 ? ' ('+total+')' : '')}
                          content="You can view and manage tumor boards here"
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >

        <Card type="table">
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
        </PageHeaderLayout>
        {openManage && <ChemotherapyManager onHide={hideManager} />}
    </React.Fragment>);
}


const enhance = compose(
    withState('openManage', 'setOpenManager', false),
    withHandlers({
        addCancer: props => () => {
            props.setOpenManager(true);
        },
        hideManager: props => () => {
            props.setOpenManager(false);
        }
    })
);

export default enhance(ChemotherapiesPure);