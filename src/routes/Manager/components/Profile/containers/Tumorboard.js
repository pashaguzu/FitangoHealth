import Tumorboard from '../components/Tumorboard';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "../../Tumorboard/containers/TumorboardManager";

export const GET_PATIENT_TUMORBOARD_QUERY  = gql`
    query GET_PATIENT_TUMORBOARD ($userId: UID!) {
        getPatientTumorboard (userId:$userId) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;

export const withQuery = graphql(GET_PATIENT_TUMORBOARD_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.user.id,
            },
        }
    },
    props: ({ ownProps, data }) => {
        const {getPatientTumorboard} = data;
        return {loading: data.loading, tumorboard:getPatientTumorboard};
    },
});




// ADD TUMORBOARD ELEMENT
const TUMORBOARD_ADD_ELEMENT_MUTATION = gql`
    mutation TumorboardAddElement($id: UID!, $userId: UID!, $elementId:UID!, $notes: String){
        tumorboardAddElement(id:$id, userId:$userId, elementId:$elementId, notes:$notes) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;


const withMutation = graphql(TUMORBOARD_ADD_ELEMENT_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onAndElement: (id, elementId, notes) => {
            return mutate({
                variables: {id: id, userId:ownProps.user.id, elementId, notes},
                refetchQueries: [{
                    query: GET_PATIENT_TUMORBOARD_QUERY,
                    variables: {userId:ownProps.user.id},
                }],
            });
        },
    }),
});
const withQueryMutation = compose(withMutation, withQuery);


export default withQueryMutation(Tumorboard);