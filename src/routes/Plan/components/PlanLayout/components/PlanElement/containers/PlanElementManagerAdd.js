import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PlanElementAdd from '../components/PlanElementManager/add';
import {PlanElementPureFragment} from "../../../../Plan/fragments";


/**
 * Queries for getting a list of lessons, etc.
 */


const PLAN_PLAN_LESSONS_QUERY = gql`
    query GET_PLAN_LESSONS ($id: UID!) {
        plan (id: $id) {
            id
            lessons {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PLAN_PLAN_ACTIVITIES_QUERY = gql`
    query GET_PLAN_ACTIVITIES ($id: UID!) {
        plan (id: $id) {
            id
            activities {
                id
                title
                elements {
                    ...PlanElement,
                }
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PLAN_PLAN_INTRO_QUERY = gql`
    query GET_PLAN_INTRO ($id: UID!) {
        plan (id: $id) {
            id
            intro {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;

const PATHWAY_ELEMENTS_QUERY = gql`
    query GET_PATHWAY_ELEMENTS ($id: UID!) {
        getPathway (id: $id) {
            id
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


export const AddLessonElementMutation = gql`
    mutation addLessonElement($planId: UID!, $type:PlanElementEnum!, $lessonId: UID!, $input:PlanBodyElementInput!) {
        addLessonElement(planId: $planId, type:$type, lessonId: $lessonId, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddLessonMutation = graphql(AddLessonElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addLessonElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, lessonId:ownProps.lessonId, input:input},
                refetchQueries: [{
                    query: PLAN_PLAN_LESSONS_QUERY,
                    variables: {id:ownProps.planId}
                }],
            })
        },
    }),
});

export const AddSectionElementMutation = gql`
    mutation addActivityElement($planId: UID!, $type:PlanElementEnum!, $activityId: UID!, $input:PlanBodyElementInput!) {
        addActivityElement(planId: $planId, type:$type, activityId: $activityId, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddSectionMutation = graphql(AddSectionElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addActivityElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, activityId:ownProps.sectionId, input:input},
                refetchQueries: [{
                    query: PLAN_PLAN_ACTIVITIES_QUERY,
                    variables: {id:ownProps.planId}
                }],
            })
        },
    }),
});

export const AddIntroElementMutation = gql`
    mutation addIntroElement($planId: UID!, $type:PlanElementEnum!, $input:PlanBodyElementInput!) {
        addIntroductionElement(planId: $planId, type:$type, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddIntroMutation = graphql(AddIntroElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addIntroElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, input:input},
                refetchQueries: [{
                    query: PLAN_PLAN_INTRO_QUERY,
                    variables: {id:ownProps.planId}
                }],
            })
        },
    }),
});


export const AddPathwayElementMutation = gql`
    mutation addPathwayElement($planId: UID!, $type:PlanElementEnum!, $input:PlanBodyElementInput!) {
        addPathwayElement(planId: $planId, type:$type, input: $input) {
            ...PlanElement
        }
    }
    ${PlanElementPureFragment}
`;
export const withAddPathwayMutation = graphql(AddPathwayElementMutation, {
    props: ({ ownProps, mutate }) => ({
        addPathwayElement: (input) => {
            return mutate({
                variables: {planId:ownProps.planId, type:ownProps.type, input:input},
                refetchQueries: [{
                    query: PATHWAY_ELEMENTS_QUERY,
                    variables: {id:ownProps.planId}
                }],
            })
        },
    }),
});



export const withMutations = compose(
    withAddLessonMutation,
    withAddSectionMutation,
    withAddIntroMutation,
    withAddPathwayMutation
);

export default withMutations(PlanElementAdd);
