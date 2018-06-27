import StageManager from '../components/StageManager';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import {GET_CANCER_STAGES_QUERY} from "../../../containers/Stages";

export const CANCER_STAGE_QUERY = gql`    
    query GET_CANCER_STAGE ($id: UID) {
        getCancerStage (id:$id) {
            id
            title
            letters
            rules {
               id
               stage
               options {
                    id
                    letter
                    name
               }
            }
        }
    }
`;

// 1- add queries:
const withQuery = graphql(
    CANCER_STAGE_QUERY,
    {
        options: (ownProps) => {
            return {
                skip: !ownProps.id,
                variables: {
                    id: ownProps.id,
                },
                //fetchPolicy: 'cache-only'
            }
        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    stage: data.getCancerStage,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);


const PlanUpdateMutation = gql`
    mutation CancerStageUpdate($id: UID!, $input:CancerStageInput!){
        cancerStageUpdate(id:$id, input:$input) {
            id
            title
            letters
            rules {
               id
               stage
               options {
                     id
                    letter
                    name
               }
            }
        }
    }
`;


const withMutation = graphql(PlanUpdateMutation, {
    props: ({ ownProps, mutate }) => ({
        onUpdateSubmit: (input, submitCallback) => {
            return mutate({
                variables: { id: ownProps.id, input: input},
                refetchQueries: [{
                    query: GET_CANCER_STAGES_QUERY,
                }],
            }).then(({data}) => {
                submitCallback();
            });
        },
    }),
});


const PlanCreateMutation = gql`
    mutation CancerStageCreate($input:CancerStageInput!){
        cancerStageCreate(input:$input) {
            id
            title
            letters
            rules {
               id
               stage
               options {
                    id
                    letter
                    name
               }
            }
        }
    }
`;


export const withAddMutation = graphql(PlanCreateMutation, {
    props: ({ ownProps, mutate }) => ({
        onCreateSubmit: (input, submitCallback) => {
            return mutate({
                variables: {input:input},
                refetchQueries: [{
                    query: GET_CANCER_STAGES_QUERY,
                }],
            }).then(({data}) => {
                submitCallback();
            });
        },
    }),
});


export const withMutations = compose(
    withMutation,
    withAddMutation,
);

export default withMutations(withQuery(StageManager));