import Compose from '../components/Compose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_CONVERSATIONS} from './ChatThreads';

const composeMutation = gql`
 mutation ComposeMessage($input: ConversationInput!) {
        createConversation(input: $input) {
             id
        }
    }
`;


const withMutation = graphql(composeMutation, {
    props: ({mutate}) => ({
        sendMessage: (input) => {
            return mutate({
                variables: {input:input},
                refetchQueries: [{
                    query: GET_CONVERSATIONS,
                    //variables: {user_id: uid, date: date},
                }],
            })
        },
    }),
});


export default withMutation(Compose);