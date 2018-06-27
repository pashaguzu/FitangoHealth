import {compose, branch, withHandlers, withState, withProps} from 'recompose';
import {TumorboardFragment} from "./fragments";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// UPDATE TUMORBOARD
const TUMORBOARD_UPDATE_MUTATION = gql`
    mutation TumorboardUpdate($id: UID!, $input:TumorboardInput!){
        tumorboardUpdate(id:$id, input:$input) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;

const withMutationEdit = graphql(TUMORBOARD_UPDATE_MUTATION, {
    props: ({ownProps:{tumorboard}, mutate }) => ({
        onUpdate: (input) => {
            return mutate({
                variables: { id: tumorboard.id, input: input},
            });
        },
    }),
});

// ADD tumorboard
const TUMORBOARD_CREATE_MUTATION = gql`
    mutation CancerTumorboard($input:TumorboardInput!){
        tumorboardCreate(input:$input) {
           ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;

export const withAddMutation = graphql(TUMORBOARD_CREATE_MUTATION, {
    props: ({ ownProps, mutate }) => ({
        onAdd: (input) => {
            return mutate({
                variables: {input:input},
                // refetchQueries: [{
                //     query: GET_PATIENT_TUMORBOARD_QUERY,
                //     variables: {userId:ownProps.userId},
                // }],
            });
        }
    })
});

export const withTumorboardMutation = branch(props => props.tumorboard && props.tumorboard.id, withMutationEdit, withAddMutation);