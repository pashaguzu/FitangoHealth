import React from 'react'
import { Row, Col,Button, Card, List, Input } from 'antd';
import { message, Modal, Divider, Tooltip, Icon} from 'antd';
import {PlanElementListItem} from '../../containers/PlanElement';
import PlanElementsSelectbox from '../../components/PlanElementsSelectbox';
import {SortableElement} from 'react-sortable-hoc';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import {EmptyList} from "../../../../../../components/Loading/index";
import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';


export class PlanSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            loading: false,
        };
        this.saveSection = this.saveSection.bind(this);
        this.clearLoading = this.clearLoading.bind(this);
    };

    static propTypes = {
    };

    static defaultProps = {
        isBuilderMode:false,
        planId:''
    }

    saveSection = (e, sectionId, isLastSection) => {

        const {upid, date, item, history} = this.props;
        this.setState({
            loading:true,
        });
        this.props.sectionReport(upid, sectionId, date).then(({data}) => {
            if (isLastSection) {
                message.success('Congrats!');
                history.push('/');// redirect to the dashboard
            } else {
                message.success(item.title+' is now completed for '+date/*<FormattedDate value={moment(date)}/>*/);
                this.props.showNextSection();
            }

            this.clearLoading();
        }).catch((error) => {
            message.error(error.message);
            this.clearLoading();
        });
    }

    clearLoading() {
        this.setState({
            loading:false,
        });
    }

    updateLabel = (e) => {
        const value = e.target.value;


        const {client, item, planId} = this.props;
        const {id} = item;

        client.writeFragment({
            id: 'PlanBodyActivity:'+id, // `id` is any id that could be returned by `dataIdFromObject`.
            fragment: gql`
            fragment PlanBodyActivityInfo on PlanBodyActivity {
              title
            }
            `,
            data: {
                title: value,
                __typename:'PlanBodyActivity'
            },
        });


        clearTimeout(this.timer);

        const updateSectionMutation =  gql`
           mutation updateActivityTitle($id: UID!, $planId: UID!, $title: String!) {
                updatePlanActivity(id:$id, planId: $planId, title: $title) {
                      id,
                      title
                }
            }
            `;


        this.timer = setTimeout(function () {
            client.mutate({mutation: updateSectionMutation, variables: {id:id, planId:planId, title:value}});
        }.bind(this), 500);
    }


   render() {

        const {upid, date, item, isLastSection, isBuilderMode, isPreviewMode, planId, elements=[]} = this.props;
        const footer = !isBuilderMode && (elements !== null && (item.elements.length > 0 || isLastSection))  ? [<Button type="primary" loading={this.state.loading} onClick={(e) => this.saveSection(e, item.id, isLastSection)}>{isLastSection ?  'Finish':'Next Section'}</Button>] : [];

        const sectionId = item.id || '';
       let title = item.title || '';
       if (isBuilderMode) {
           title = <Input defaultValue={item.title} placeholder="Title" onKeyUp={this.updateLabel} />
       }

       return (<Card title={title} bordered={false} actions={footer}>
            {1===5 && isBuilderMode && !isPreviewMode && <PlanElementsSelectbox mode="section" sectionId={sectionId} planId={planId} schedule={true} />}
            {elements.length > 0 ?
                <List
                size="large"
                itemLayout="vertical"
                split={false}
                dataSource={elements}
                renderItem={(item, i) => {
                    return  <PlanElementEnhanced   key={'item' + item.id} index={i}  i={i} item={item} isBuilderMode={isBuilderMode} mode="section" sectionId={sectionId} isPreviewMode={isPreviewMode} planId={planId} upid={upid} date={date} element={item} schedule />
                }}
                />

:  <EmptyResults {...this.props} />}
</Card>)
}
}


/**
 * Enhance Plan element
 */
const PlanElementEnhanced = compose(
    branch(props => props.isBuilderMode, SortableElement)
)(PlanElementListItem);

const EmptyResultsPure = (props) => {
    return <EmptyList>No elements have been added yet</EmptyList>;
}


const PlanElementAddLinePure = (props) => {

    return <Divider className="element-actions">
    {props.modalAdd && <Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}><PlanElementsSelectbox mode="section" sectionId={props.item.id} planId={props.planId}/></Modal>}
    <Tooltip title="Add Element" onClick={props.openAddElement} ><Icon type="plus-circle-o" style={{cursor:'pointer'}} /> Add First Element</Tooltip>
    </Divider>;
}

const PlanElementAddLine = compose(
withState('modalAdd', 'setModal', false),
withHandlers({
    openAddElement: props => () => {
    props.setModal(true);
},
    openHideElement: props => () => {
    props.setModal(false);
}
}),
)(PlanElementAddLinePure);

const EmptyResults = compose(
branch(props => props.isBuilderMode === true, renderComponent(PlanElementAddLine))
)(EmptyResultsPure);



export default withRouter(withApollo(PlanSection));
