import ChatInput from '../components/ChatInput';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SEND_MESSAGE = gql`
    mutation sendMessage($id: UID!, $message: String!) {
        sendMessage(id:$id, message:$message) {
            id
        }
    }
`;

const withMutation = graphql(SEND_MESSAGE, {
    props: ({ ownProps, mutate }) => ({
        onSendMessage: (message) => {
            return mutate({
                variables: { message: message, id: ownProps.id },
                refetchQueries: (mutationResult) => ['GET_CONVERSATIONS'/*{
                    query: GET_CONVERSATION_MESSAGES_QUERY,
                    variables: {
                        id: ownProps.id,
                        cursors: {after: ownProps.lastCursor}
                    },
                }*/]
            })
        },

    }),
});


export default withMutation(ChatInput);