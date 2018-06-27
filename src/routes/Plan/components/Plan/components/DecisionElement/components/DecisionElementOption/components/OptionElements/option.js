import React from 'react';
import { DragSource } from 'react-dnd';
import {Card, List, Badge, Modal, Icon} from 'antd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import PlanElement from '../../../../../../../../components/PlanLayout/components/PlanElement';
import {EmptyList} from "../../../../../../../../../../components/Loading/index";
import PlanElementChildrenSelect from "../../../../../../../../components/PlanLayout/components/PlanElement/components/PlanElementChildrenList/components/PlanElementChildrenSelect";

import { compose, withProps, branch, withHandlers , defaultProps, withState} from 'recompose';









const boxSource = {
    beginDrag(props) {
        console.log(props);
        return {
            element: props.element,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        if (dropResult) {
            props.onDrop(item);
        }
    },
    //canDrag(props, monitor) {
    //console.log(props);
    //return props.element.type !== 'decision' && props.element.type !== 'condition';
    //}
}







export const canBeDraggable = (element) => {
    return element.type !== 'decision' && element.type !== 'condition';
}











const PlanElementDraggableHOC = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}));


const PlanElementDraggable = (props) => {

    const { isDraggable, isDragging, connectDragSource, element, preventCardDraggable } = props
    const opacity = isDragging ? 0.4 : 1

    if (isDraggable && connectDragSource && preventCardDraggable && canBeDraggable(element)) {
        return connectDragSource(<div className="pathway-el-dnd" style={{opacity}} ><PlanElement {...props} element={element}/></div>);
    } else {
        return <PlanElement {...props} showAdd={true} element={element} />;
    }
}



//const PlanElementDraggableEnhanced = PlanElementDraggable;//branch(props => props.isDraggable && props.preventCardDraggable, PlanElementDraggableHOC)(PlanElementDraggable);



const OptionListItem = (props) => {
    //console.log(props);
    return <div><PlanElementDraggable  {...props}  key={props.element.id} mode="decision"  /></div>;
}
const OptionEnhanced = compose(
    branch(props => props.isBuilderMode,  SortableElement)
)(OptionListItem);

export default OptionEnhanced;
