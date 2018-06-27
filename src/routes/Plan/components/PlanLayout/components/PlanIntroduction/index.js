import React from 'react'
import {Row, Col, Button, Card, List, Input } from 'antd';
import { message, Modal, Divider, Tooltip, Icon} from 'antd';
import {PlanElementListItem} from '../../containers/PlanElement';
import PlanElementsSelectbox from '../../components/PlanElementsSelectbox';
import {EmptyList} from "../../../../../../components/Loading/index";
import {SortableElement} from 'react-sortable-hoc';

import {branch, compose, withHandlers, withProps, withState, renderComponent} from 'recompose';

export class PlanIntroduction extends React.Component {

    static propTypes = {

    };

    static defaultProps = {
        isBuilderMode:false,
        elements:[]
    }

    render() {

        const {elements, isBuilderMode, isPreviewMode, planId} = this.props;

        return (<Card  bordered={false} >
            {1==5 && isBuilderMode && !isPreviewMode && <PlanElementsSelectbox mode="introduction" planId={planId} />}
            {elements.length > 0 ? <List
            size="large"
            itemLayout="vertical"
            split={false}
            dataSource={elements}
            renderItem={(item, i) => {
                return  <PlanElementEnhanced item={item} key={'item' + item.id} index={i} i={i} isBuilderMode={isBuilderMode} mode="introduction"  isPreviewMode={isPreviewMode} planId={planId}  element={item} />
            }}
            />:  <EmptyResults {...this.props} />}
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
        {props.modalAdd && <Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}><PlanElementsSelectbox mode="introduction" planId={props.planId} /></Modal>}
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



export default PlanIntroduction;
