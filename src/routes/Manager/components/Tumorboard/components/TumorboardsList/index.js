import React from 'react';
import moment from 'moment';
import {withApollo} from 'react-apollo';
import {Input, Card,Table,  Button, Icon, Tooltip, Radio} from 'antd';
import {TumorobardQueryOptions} from "../../queries";
import {compose, withState, withHandlers, withStateHandlers, withProps} from 'recompose';
import sort from '../../../../../../components/Tables/sort'
////import ChemotherapyManager from './containers/ChemotherapyManager';
import TumorboardView from '../../containers/TumorboardView';
import TumorboardAdd from './components/TumorboardAdd';
import TumorboardEdit from './components/TumorboardEdit';
import {PageHeader} from "../../../../../../components/Layout/PageHeader/index";
import {PageHeaderLayout} from "../../../../../../components/Layout/PageHeaderLayout/index";
import {AvatarWithName} from "../../../../../User/components/AvatarWithName/index";
import {SpinIndicator} from "../../../../../../components/Loading/index";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const CancerTitlePure = ({tumorboard, openView, openViewModal, hideViewModal, openEditorModal, hideEditorModal, openEditor}) => {
    return <React.Fragment>
        <a onClick={openViewModal}>{tumorboard.title}</a>
        {openView &&  <TumorboardView onHide={hideViewModal} tumorboard={tumorboard} asModal />}
    </React.Fragment>
}
const enhanceTitle = compose(
    withStateHandlers(
        (props) => ({
            openView: false,
        }),
        {
            openViewModal: ({ counter }) => (value) => ({
                openView: true
            }),
            hideViewModal: ({ counter }) => (value) => ({
                openView: false
            }),
        }
        )
);
const Title = enhanceTitle(CancerTitlePure);

const TumorobardsListPure = props => {
    const {items=[], total, loading, openManage, addCancer, hideManager} = props;
    console.log(items);
    const columns = [{
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter:(a, b) => sort(a,b,"title"),
             render: (title, info) => {
                 return <Title tumorboard={info}/>;
             },
                filterIcon: <Icon type="search" />,

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
        },
        {
            title: 'Lead',
            dataIndex: 'lead',
            key: 'lead',
            render: (title, info) => {
                return <AvatarWithName user={info.lead} />
            },
            sorter:(a, b) => sort(a,b,"lead"),
        },
        {
            title: 'Date',
            dataIndex: 'startDate',
            key: 'date',
            render: (title, info) => {
                return moment(title).format('L');
            },
            sorter: (a, b) => a.startDate - b.startDate,
            width: 110,

        },
        {
            title: 'Time',
            dataIndex: 'startTime',
            key: 'time',
            render: (title, info) => {
                return moment(title).format('LT');
            },
            sorter: (a, b) => a.startTime - b.startTime,
            width:100,

        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '# Invitee',
            key: 'invitee',
            render: (title, info) => {
                const {participants=[]} = info;
                return participants.length;
            },
        },
        {
            title: '# Cases',
            key: 'cases',
            render: (title, info) => {
                const {getCases=[]} = info;
                return getCases.length;
            },
        },
        {
            title: '',
            key: 'action',
            width:50,
            render: (text, record) => (
                       <TumorboardEdit tumorboard={record} />
            ),
        }];
    const dataSource = items.map((cancer, i) => ({...cancer, key:i}));

    const actions = <React.Fragment>
        <RadioGroup defaultValue="all" style={{marginRight:10}} onChange={props.onChangeStatus}>
            <RadioButton value="all">All</RadioButton>
            <RadioButton value="open">Open</RadioButton>
            <RadioButton value="past">Past</RadioButton>
        </RadioGroup>
        <TumorboardAdd />
    </React.Fragment>;
    return (<React.Fragment>
        <PageHeaderLayout title={'Tumor Boards '+ (total > 0 ? ' ('+total+')' : '')}
                          content="You can view and manage tumor boards here"
                          // extraContent={<Input.Search style={{width:200}} />}
                          action={actions}
                          >
            <Card type="table"
            >
                <Table dataSource={dataSource} columns={columns}
                       loading={loading ? <SpinIndicator /> : false }
                       expandedRowRender={info => {
                           //console.log(info);
                           return <TumorboardView tumorboard={info} />;
                       }}
                       //onExpand={props.loadDetails}
                       pagination={false} />
            </Card>
        </PageHeaderLayout>
    </React.Fragment>);
}



const enhance = compose(
    // withState('openManage', 'setOpenManager', false),
    // withApollo,
    withHandlers({
        onChangeStatus: props => (e) => {
            const status = e.target.value;
            props.loadByStatus(status);
        }
        // loadDetails: props => (expanded, record) => {
        //     // load info
        //     if (expanded) {
        //         TumorobardQueryOptions.variables = {
        //             id: record.id
        //         };
        //         // if expanded, load the info
        //         props.client.query(TumorobardQueryOptions)
        //             .then(({data}) => {
        //             console.log(data);
        //                 const {getCancerStage = {}} = data;
        //                 //props.selectStage(getCancerStage);
        //             });
        //     }
        //     console.log(expanded);
        //     console.log(record);
        //     //props.setOpenManager(true);
        // },
    })
);

export default enhance(TumorobardsListPure);