import React, { Component } from 'react'
import  {Tag} from 'antd';
import { DragSource } from 'react-dnd'


const boxSource = {
    beginDrag(props) {
        console.log(props);
        return {
            type: props.type,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult()
        console.log(props);
        console.log(item);
        if (dropResult) {

            //alert(`You dropped ${item.element.type} into ${dropResult.name}!`) // eslint-disable-line no-alert
        }
    },
}


const CalculatorElement = (props) => {
    const { connectDragSource, children } = props

    return connectDragSource(<span><Tag>{children}</Tag></span>)
}


export default DragSource('box', boxSource, (connect, monitor)  => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(CalculatorElement);