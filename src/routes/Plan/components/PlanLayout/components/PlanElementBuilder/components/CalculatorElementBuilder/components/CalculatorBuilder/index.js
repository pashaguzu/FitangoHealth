import React from 'react';

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import CalculatorFormula from './formula';
import CalculatorElement from './element';

const CalculatorBuilder = (props) => {
    return <div>

        <CalculatorFormula {...props} />
        <div>
            <CalculatorElement onDrop={props.onDrop} type="brackets">()</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="/">/</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="*">*</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="+">+</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="-">-</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="^">^</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="field">Tracker</CalculatorElement>
            <CalculatorElement onDrop={props.onDrop}  type="number">Number</CalculatorElement>
        </div>
    </div>
}


const enhance = compose(
    DragDropContext(HTML5Backend),
    withState('elements', 'setElements', []),
    withHandlers({
        addChildElement: props => (item, i) => {
            const elements = props.elements.map((el, el_i) => {
                if (el_i === i) {
                    return {...el, elements: [...el.elements, {...item, elements:[]}]};
                } else {
                    return el;
                }
            });
            props.setElements(elements);
        },
        onDrop: props => item => {
            props.setElements([...props.elements, {...item, elements:[]}]);
        }
    })
);

export default enhance(CalculatorBuilder);