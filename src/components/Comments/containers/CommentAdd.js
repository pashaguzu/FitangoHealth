import CommentAdd from '../components/CommentAdd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_COMMENTS_LIST} from "../queries";

const CREATE_COMMENT_MUTATION = gql`
 mutation CommentCreate($userId: UID, $parentId: UID, $tagId: UID!, $tagType: String!, $message: String!, $attachments: [Json]) {
        commentCreate(userId: $userId, parentId: $parentId, tagId: $tagId, tagType: $tagType, message: $message, attachments:$attachments) {
             id
        }
    }
`;


const withMutation = graphql(CREATE_COMMENT_MUTATION, {
    props: ({mutate}) => ({
        sendMessage: ({userId, tagId, tagType, message, parentId, attachments}) => {
            return mutate({
                variables: {userId, tagId, tagType, message, parentId, attachments},
                refetchQueries: [{
                    query: GET_COMMENTS_LIST,
                    variables: {tagId, tagType, parentId},
                }],
            })
        },
    }),
});


export default withMutation(CommentAdd);