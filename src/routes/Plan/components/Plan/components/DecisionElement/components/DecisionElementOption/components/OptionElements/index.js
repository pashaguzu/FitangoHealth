import React from 'react';

import {Divider, Tooltip, Modal, Icon} from 'antd';
import { compose, withProps, branch, withHandlers, renderComponent , defaultProps, withState} from 'recompose';

import {SortableContainer, arrayMove} from 'react-sortable-hoc';
import {EmptyList} from "../../../../../../../../../../components/Loading/index";
import {PlanElementsSelectbox} from "../../../../../../../PlanLayout/components/PlanElementsSelectbox/index";
import Option from './option';

const OptionsElements = props => {
    const {elements=[]} = props;
    //parentId={props.id} parentValue={option.value}
    //console.log(elements);
    // check if we have at least one of condition or decision
    //console.log(props);
    return (elements.length > 0 ? <div
        // size="small"
        // split={false}
        // itemLayout="vertical"
        // dataSource={elements}
        // renderItem={(element, i) => <Option  {...props} key={`field-${element.id}`} index={i}  element={element} i={i} collection="decision"  />}
    >
        {elements.map((element, i) => <Option {...props} key={`option-${element.id}`} index={i} element={element} i={i} collection="decision" />)}
    </div>: <EmptyResults {...props} />);//}<EmptyList>No Elements {props.isBuilderMode && 'yet.'}</EmptyList>);
}



const EmptyResultsPure = (props) => {
    return <EmptyList>No elements have been added yet</EmptyList>;
}


const PlanElementAddLinePure = (props) => {
    // console.log(props);
    const {parentId, parentValue} = props;
    return <Divider className="element-actions">
        {props.modalAdd && <Modal title="Select Element" visible={true} footer={false} onCancel={props.openHideElement}><PlanElementsSelectbox mode="decision" planId={props.planId} parentId={parentId} parentValue={parentValue} /></Modal>}
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

const OptionsElementsEnhanced = compose(
    withProps(props => {
        console.log(props);
    }),
    // withHandlers({
    //     updateOrder: props => elements => {
    //         //const elements = props.elements;
    //         const ids = elements.map(element => element.id);
    //         // u
    //         //console.log(props);
    //         //props.setIsReorder(true);
    //         props.updateElementsOrder(ids, elements);
    //
    //     }
    // }),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const newElements = arrayMove(props.elements, oldIndex, newIndex);
            //console.log(props.elements);
            console.log(newElements);
            //props.setElements(newElements);
            //props.updateOrder(newElements);
        }
    }),
    branch(props => props.isBuilderMode, SortableContainer),
)(OptionsElements);

export default OptionsElementsEnhanced;