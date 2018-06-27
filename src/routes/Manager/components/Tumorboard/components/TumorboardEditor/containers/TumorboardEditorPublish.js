import TumorboardEditorPublish from '../components/TumorboardEditorPublish';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "../../../fragments";
import {UserInfoFragment} from "../../../../../../User/fragments";
import {GET_TUMORBARDS_QUERY} from "../../../containers/TumorboardsList";

const TUMORBOARD_PUBLISH_MUTATION = gql`
    mutation TumorboardPublish($id: UID!, $participants:[UID], $isOpen: Boolean!, $message: String){
        tumorboardInvite(id:$id, participants:$participants, isOpen:$isOpen, message:$message) {
            ...TumorboardInfo
        }
    }
    ${TumorboardFragment}
`;


const withMutation = graphql(TUMORBOARD_PUBLISH_MUTATION, {
    props: ({ownProps, mutate }) => ({
        onSubmit: (id, participants) => {
            return mutate({
                variables: {id: id, userId:ownProps.userId, ...participants},
                refetchQueries: [{
                    query: GET_TUMORBARDS_QUERY,
                }],
            });
        },
    }),
});


export default withMutation(TumorboardEditorPublish);