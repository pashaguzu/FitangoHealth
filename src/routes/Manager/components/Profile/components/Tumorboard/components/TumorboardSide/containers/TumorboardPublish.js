import TumorBoardPublish from '../components/TumorBoardPublish';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "../../../../../../Tumorboard/containers/TumorboardManager";
import {UserInfoFragment} from "../../../../../../../../User/fragments";

const GET_PATIENT_TUMORBOARD_QUERY  = gql`
    query GET_PATIENT_TUMORBOARD ($userId: UID!) {
        getPatientTumorboard (userId:$userId) {
            ...TumorboardInfo
            participants {
                ...UserInfo
            }
        }
    }
    ${TumorboardFragment}
    ${UserInfoFragment}
`;

const withQuery = graphql(GET_PATIENT_TUMORBOARD_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.userId,
            },
        }
    },
    props: ({ ownProps, data }) => {
        const {tumorboard} = ownProps;
        const {getPatientTumorboard=tumorboard} = data;
        return {loading: data.loading, tumorboard:getPatientTumorboard};
    },
});

const TUMORBOARD_PUBLISH_MUTATION = gql`
    mutation TumorboardPublish($id: UID!, $userId: UID!, $participants:[UID], $isOpen: Boolean!, $message: String){
        tumorboardInvite(id:$id, userId:$userId, participants:$participants, isOpen:$isOpen, message:$message)
    }
`;


const withMutation = graphql(TUMORBOARD_PUBLISH_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onSubmit: (id, participants) => {
            return mutate({
                variables: {id: id, userId:ownProps.userId, ...participants},
                // refetchQueries: [{
                //     query: GET_PATIENT_TUMORBOARD_QUERY,
                // }],
            });
        },
    }),
});

const withQueryMutation = compose(withQuery, withMutation);

export default withQueryMutation(TumorBoardPublish);