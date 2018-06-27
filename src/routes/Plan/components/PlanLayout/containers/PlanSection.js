import PlanSection from '../components/PlanSection'
import {arrayMove, SortableContainer, SortableElement,} from 'react-sortable-hoc';
import {branch, compose, withHandlers, withProps, withState} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {withUpdateOrderMutation} from "../components/PathwayBody/index";


const reportOnLesson = gql`
    mutation sectionReport($id: UID!, $upid: UID! $date: Date!) {
        sectionComplete(id:$id, upid:$upid, date:$date) {
             id
             completed(date:$date, upid:$upid)
        }
    }
`;



const withMutation = graphql(reportOnLesson, {
    props: ({ mutate }) => ({
        sectionReport: (upid, id, date) => {
            return mutate({
                variables: {upid:upid, id: id, date:date },
            });
        },

    }),
});
/*
const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteMed: (med_id) => {
        // delete medication
        ownProps.medicationDelete(med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                //toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    },
    onClick: (med_id, report, is_taken, toggleCoin) => {

        let new_report = {id:report.id};

        new_report.isTaken = is_taken;
        new_report.date = ownProps.date;
        if (ownProps.time) {
            new_report.time = ownProps.time;
        }

        ownProps.medicationReport({ report: new_report}, med_id)
            .then(({data}) => {
                //const token = data.login.token;
                //const user = data.login.user;

                //ownProps.report.id = 0;

                toggleCoin();

            }).catch((error) => {
            message.error(error.message);
        });
    }

});*/



/**
 * Enhance Body
 */
const builderEnhance = compose(
    withState('elements2', 'setElements', null),
    withProps(props => {
        let propsUpdated = {
            mode:'section'
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


export default enhance(PlanSection);
