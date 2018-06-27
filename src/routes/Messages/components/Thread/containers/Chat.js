import Chat from '../components/Chat';
import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const GET_CONVERSATION_MESSAGES_QUERY = gql`    
    query GET_CONVERSATION_MESSAGES ($id: UID!, $cursors: CursorInput) {
      account {
        inboxConversation (id:$id) {
          id
          subject
          messages (cursors:$cursors) @connection(key: "messages") {
            totalCount
            pageInfo {
                endCursor
            }
            edges {
                id
                text
                isRead
                sender {
                    id
                    firstName
            thumbs {
                small
                large
                medium
            }
                }
                sentAt
              }
          }
        }
      }
    }
`;

const ChatWithQuery = graphql(
    GET_CONVERSATION_MESSAGES_QUERY,
    {
        options: (ownProps) => {

            return {
                skip: !ownProps.id,
                variables: {
                    id: ownProps.id,
                    //cursors: {after: ownProps.lastCursor}
                },
                //pollInterval: 5000,
                //fetchPolicy: 'network-only'
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading && data.account.inboxConversation) {
                const {edges, totalCount} = data.account.inboxConversation.messages;
                let messages = [];
                if (data.account.inboxConversation) {

                    messages = edges;
                } else {
                    messages = edges;
                }

                return {
                    subject: data.account.inboxConversation.subject,
                    messages: messages,
                    totalCount: totalCount,
                    //lastCursor: endCursor,
                    loading: data.loading,
                    loadMoreEntries: (lastCursor) => {
                        return data.fetchMore({
                            query: GET_CONVERSATION_MESSAGES_QUERY,
                            variables: {
                                id: ownProps.id,
                                cursors: {after: lastCursor}
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {

                                if (!fetchMoreResult) { return previousResult; }
                                const newMessages = [...previousResult.account.inboxConversation.messages.edges, ...fetchMoreResult.account.inboxConversation.messages.edges]
                                // add total count
                                const obj =  Object.assign({}, previousResult, {
                                    account: {
                                        ...previousResult.account, inboxConversation:
                                            {...previousResult.account.inboxConversation, messages: { ...previousResult.account.inboxConversation.messages , edges: newMessages}}
                                    }
                                });

                                return obj;
                            },
                        });
                    }
                }

            } else {
                return {loading: data.loading, messages:[],totalCount:0}
            }
        },
    }
)(Chat);



const mapStateToProps = (state) => {
    return {
        userId: state.user.info.id
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWithQuery);