import React from 'react'
import {Card, List, Badge, Modal, Icon} from 'antd';
import { DragSource } from 'react-dnd';
import { compose, withProps, branch, withHandlers , defaultProps, withState} from 'recompose';

import OptionElements from './components/OptionElements';

















const DecisionElementOptionCard = (props) => {
    const { i, mode, planId, option, isDragging, preventCardDraggable, connectDragSource, isDraggable=false, isBuilderMode = false} = props;

    //const extra = isBuilderMode ? <a onClick={props.toggleAdd} style={{color:'inherit'}}><Icon type="plus" /> Element</a> : null;
    //const opacity = isDragging ? 0.4 : 1
    return <React.Fragment>
        <Card key={option.id} title={<span><Badge count={i+1} style={{ backgroundColor: '#52c41a' }} /> {option.label}</span>}  type="option" >
            <OptionElements {...props} parentId={props.id} parentValue={option.value} lockToContainerEdges lockAxis="y" useDragHandle={false} distance={10} />
        </Card>
        {/*(isBuilderMode && props.openAddOption) &&
               <Modal title="Select Element" visible={true} onOk={props.toggleAdd} onCancel={props.toggleAdd}>
                   <PlanElementChildrenSelect mode={mode} view="decision" planId={planId} parentId={props.id} parentValue={option.value} onHide={props.toggleAdd} onElementAdd={props.onElementAdd} />
               </Modal>
            */}
    </React.Fragment>;
}


const addChildEnhancement = compose(
    withState('openAddOption', 'setAddOption', false),
    withHandlers({
        toggleAdd: props => () => {
            props.setAddOption(!props.openAddOption);
        }
    })
);
const draggableHoc = (ComponentBeingWrapped) => {

    function Layout(props) {
        const {connectDragSource} = props;//isDraggable, preventCardDraggable, isDragging,
        return connectDragSource(<div><ComponentBeingWrapped {...props} /></div>);
    }

    return Layout
}




const boxSource = {
    beginDrag(props) {
        //console.log(props);
        return {
            //element: props.element,
            elements: props.elements,
        }
    },

    endDrag(props, monitor) {
        const item = monitor.getItem()
        const dropResult = monitor.getDropResult();
        //console.log(item);
        if (dropResult) {
            props.onDrop(item);
        }
    },
    //canDrag(props, monitor) {
    //console.log(props);
    //return props.element.type !== 'decision' && props.element.type !== 'condition';
    //}
}
const PlanElementDraggableHOC = DragSource('box', boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}));

const enhance = compose(
    withProps(props => {
        const {elements=[]} = props;
        const preventDraggable = elements.filter(element => element.type==='decision' || element.type==='condition');
        //console.log(elements);
        const preventCardDraggable = elements.length === 0 || preventDraggable.length > 0;
        return {preventCardDraggable};
    }),
    withHandlers({
        onSortEnd: props => (value) => {
            console.log(value);
        }
    }),
    // drag the card if we don't have decision or condition inside
    branch(props => props.isDraggable && !props.preventCardDraggable, PlanElementDraggableHOC),
    branch(props => props.isDraggable && !props.preventCardDraggable, draggableHoc),
    branch(props => props.isBuilderMode, addChildEnhancement),
);

const DecisionElementOptionCardEnhanced = enhance(DecisionElementOptionCard);

export default DecisionElementOptionCardEnhanced;