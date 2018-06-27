import PlanLesson from '../components/PlanLesson'
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import {branch, compose, withHandlers, withProps, withState, lifecycle} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withUpdateOrderMutation} from "../components/PathwayBody/index";


const reportOnLesson = gql`
    mutation lessonReport($id: UID!, $upid: UID!) {
        lessonComplete(id:$id, upid: $upid) {
             id
             completed
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        lessonReport: (upid, id) => {
            return mutate({
                variables: { upid:upid, id: id },
            })
        },

    }),
});




/**
 * Enhance Body
 */
const builderEnhance = compose(
    withState('elements2', 'setElements', null),
    withProps(props => {
        console.log(props);
        let propsUpdated = {
            mode:'lesson'
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
        const {item={}} = props;
        const {elements=[]} = item;

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
            //console.log(props.elements);
            props.updateOrder(newElements);
        }
    }),
    SortableContainer,
);

const enhance = compose(
    withMutation,
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


export default enhance(PlanLesson);
