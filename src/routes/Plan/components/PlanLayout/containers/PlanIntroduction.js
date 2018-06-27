import PlanIntroduction from '../components/PlanIntroduction'
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import {branch, compose, withHandlers, withProps, withState} from 'recompose';
import {withUpdateOrderMutation} from "../components/PathwayBody/index";



/**
 * Enhance Body
 */
const builderEnhance = compose(
    withState('elements2', 'setElements', null),
    withProps(props => {
        console.log(props);
        let propsUpdated = {
            mode:'introduction'
        };
        if (props.isBuilderMode && !props.isPreviewMode) {
            propsUpdated = {...propsUpdated, ...{
                useDragHandle: true,
                lockAxis: 'y',
                onSortEnd: props.onSortEnd,
                useWindowAsScrollContainer: true
            }}
        }

        const {elements2=null} = props;
        const {elements=[]} = props;

        propsUpdated.elements = elements2 ? elements2 : elements;

        return propsUpdated;
    }),

    withUpdateOrderMutation,
    //branch(props => props.isBuilderMode, withUpdateOrderMutation),
    withHandlers({
        updateOrder: props => elements => {
            //console.log(props);
            //console.log(elements);
            const ids = elements.map(element => element.id);
            props.updateElementsOrder(ids, elements);

        }
    }),
    withHandlers({
        onSortEnd: props => ({oldIndex, newIndex}) => {
            const newElements = arrayMove(props.elements, oldIndex, newIndex);
            props.updateOrder(newElements);
        }
    }),
    SortableContainer,
);

const enhance = compose(
    branch(props => props.isBuilderMode, builderEnhance),
    withProps(props => {
        const {item={}} = props;
        const {elements=[]} = item;
        //console.log(props);
        return {
            elements: elements
        }
    })
)


export default enhance(PlanIntroduction);
