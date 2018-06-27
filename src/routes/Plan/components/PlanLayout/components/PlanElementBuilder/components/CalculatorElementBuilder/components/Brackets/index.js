import React from 'react';
import { DropTarget } from 'react-dnd';
import { compose, withHandlers, withState, withProps, branch, renderComponent} from 'recompose';
import './index.less';
import CalculatorFormulaElement from '../CalculatorFormulaElement';

const Brackets = (props) => {
    const {children, connectDropTarget, isOverCurrent, el, addChildElement} = props;
    console.log(props);
    return connectDropTarget(<span className="calc-brackets" style={isOverCurrent ? {borderColor:'#000',backgroundColor: 'green'} : {}}>(<span className="calc-brackets-content">
        {el.elements.map((el2, i) => {

            return <CalculatorFormulaElement el={el2} i={i} key={i} addChildElement={addChildElement} />

            //<Brackets><Brackets>12*56</Brackets>+<Brackets>12-9</Brackets></Brackets>
        })}
    </span>)</span>);
}



const boxTarget = {

    drop(props, monitor, component) {
        const hasDroppedOnChild = monitor.didDrop()
        if (hasDroppedOnChild && !props.greedy) {
         //   return
        }
        const item = monitor.getItem();


        console.log(component);
        console.log();
        console.log(monitor.getDropResult());
        console.log(props, 'In Bracket');


        props.addChildElement(item, props.i);
        /*component.setState({
            hasDropped: true,
            hasDroppedOnChild,
        })*/
    },
}


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

export default enhance(Brackets);