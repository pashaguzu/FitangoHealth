import React from 'react';
import { DragSource } from 'react-dnd';
import PlanElement from '../../../../../components/PlanElement';
import { compose, withProps, branch, withHandlers , defaultProps, renderComponent} from 'recompose';


const canBeDraggable = (element) => {
    return element.type !== 'decision' && element.type !== 'condition';
}
const PlanChildElement = (props) => {
    return <PlanElement {...props} />;
}

const PlanChildElementDraggable = (props) => {
    const { isDraggable, isDragging, connectDragSource } = props
    const opacity = isDragging ? 0.4 : 1;
    if (isDraggable && canBeDraggable(props.element)) {
        return connectDragSource(<div className="pathway-el-dnd" style={{opacity}} >
            <PlanElement {...props} /></div>);
    } else {
        return <PlanElement {...props} />;
    }
}

/**
 * For drag and drop
 */
const boxSource = {
    beginDrag(props) {
        return {
            element: props.element,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()

        if (dropResult) {
            props.onDrop(item);
            //alert(`You dropped ${item.element.type} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    },
    canDrag(props, monitor) {
        return canBeDraggable(props.element);
    }
}

const PlanElementDraggable = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(PlanChildElementDraggable);

const enhance = compose(
    defaultProps({
        isDraggable:false
    }),
    withHandlers({
        makeReport: props => () => {
            console.log(props);
        }
    }),
    //branch(props => props.isDraggable, PlanElementDraggable)
    branch(props => props.isDraggable, renderComponent(PlanElementDraggable))
);






export default enhance(PlanChildElement);