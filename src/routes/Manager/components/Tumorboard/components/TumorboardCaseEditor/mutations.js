import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardCaseFragment, TumorboardFragment} from "../../fragments";
import {GET_TUMORBOARD_QUERY} from "../../queries";

// ADD TUMORBOARD ELEMENT
const CREATE_TUMORBOARD_CASE_MUTATION = gql`
    mutation TumorboardCaseCreate($id: UID!, $userId: UID!, $elements:[TumorboardCaseElementInput]!){
        tumorboardCaseCreate(tumorboardId:$id, userId:$userId, elements:$elements) {
            ...TumorboardCaseInfo
        }
    }
    ${TumorboardCaseFragment}
`;


export const withCreateTumorboardCaseMutation = graphql(CREATE_TUMORBOARD_CASE_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createTumorboardCase: (elements) => {
            return mutate({
                variables: {id: ownProps.tumorboard.id, userId:ownProps.user.id, elements},
                refetchQueries: [{
                    query: GET_TUMORBOARD_QUERY,
                    variables: {id:ownProps.tumorboard.id},
                }],
            });
        },
    }),
});


// UPDATE TUMORBOARD
const TUMORBOARD_CASES_ORDER_MUTATION = gql`
    mutation TumorboardUpdateCasesOrder($id: UID!, $casesIds:[UID]!){
        tumorboardUpdateCasesOrder(tumorboardId:$id, casesIds:$casesIds) {
          ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;


export const withUpdateTumorboardCasesOrderMutation = graphql(TUMORBOARD_CASES_ORDER_MUTATION, {
    props: ({ownProps:{tumorboard}, mutate }) => ({
        updateOrder: (casesIds) => {
            return mutate({
                variables: { id: tumorboard.id, casesIds},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});

// UPDATE TUMORBOARD
const TUMORBOARD_CASES_MUTATION = gql`
    mutation TumorboardUpdateCases($id: UID!, $cases:[TumorboardCaseInput]!){
        tumorboardUpdateCases(tumorboardId:$id, cases:$cases) {
          ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;


export const withUpdateTumorboardCasesMutation = graphql(TUMORBOARD_CASES_MUTATION, {
    props: ({ownProps:{tumorboard}, mutate }) => ({
        updateCases: (cases) => {
            return mutate({
                variables: { id: tumorboard.id, cases},
                // refetchQueries: [{
                //     query: GET_CANCER_STAGES_QUERY,
                // }],
            });
        },
    }),
});

