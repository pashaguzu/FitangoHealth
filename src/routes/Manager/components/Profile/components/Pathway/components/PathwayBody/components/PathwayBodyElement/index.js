import React from 'react';
import PropTypes from 'prop-types'

import PathwayElement from './containers/PathwayElement';
import { DragSource } from 'react-dnd'
import './index.less';

export const canBeDraggable = (element) => {
    return element.type !== 'decision' && element.type !== 'condition';
}
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
        //console.log(props);
        return canBeDraggable(props.element);
    }
}


 class PathwayBodyElement extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        //name: PropTypes.string.isRequired,
    }

    render() {
        const {i, element, planId, onDrop, currentInOrder} = this.props;

        const { isDragging, connectDragSource } = this.props
        const opacity = isDragging ? 0.4 : 1

        if (canBeDraggable(element)) {
            return connectDragSource(<div className={"pathway-el-dnd"} style={{opacity}}><PathwayElement i={i} isDraggable onDrop={onDrop} currentInOrder={currentInOrder} element={element} planId={planId} /></div>);

        } else {
            return <div className={element.type === 'condition' ? 'red-card-wrap' : {}} ><PathwayElement i={i} isDraggable onDrop={onDrop} currentInOrder={currentInOrder} element={element} planId={planId} /></div>;
        }

    }
}

//export default PathwayBodyElement;

export default DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(PathwayBodyElement);