import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CalculatorFormulaElement from '../CalculatorFormulaElement';

import { DropTarget } from 'react-dnd'
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';



const boxTarget = {

    drop(props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild && !props.greedy) {
            return
        }

        //console.log(component);
        //console.log(props);
        const item = monitor.getItem()
        props.onDrop(item);
        /*component.setState({
            hasDropped: true,
            hasDroppedOnChild,
        })*/
    },
}

const CalculatorFormula = (props) => {

    const {
        greedy,
        isOver,
        isOverCurrent,
        connectDropTarget,
        elements,
        addChildElement
    } = props
    console.log(props);
    console.log(elements);
    //const elements = [];
    return connectDropTarget(<div style={{border: '1px solid #ccc', 'padding': '10px'}}>{elements.map((el, i) => {
        return <CalculatorFormulaElement el={el} i={i} key={i} addChildElement={addChildElement} />
    })}</div>);
};


const enhance = compose(
    DropTarget('box', boxTarget, (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
    })),
    withHandlers({
        onDrop: props => value => {

        }
    })
);

export default enhance(CalculatorFormula);

