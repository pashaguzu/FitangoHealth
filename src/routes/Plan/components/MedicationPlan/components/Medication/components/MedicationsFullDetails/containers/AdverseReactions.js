import AdverseReactions from '../components/AdverseReactions'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const GetMedReactionsQuery = gql`
query getAdverseReactions($id:UID!, $userId: UID!) {
    medication(id: $id,userId: $userId) {
       id
       reactions {
          id
          reaction
          severity
          createdAt
       }
    }
    
    reactionTypes: __type(name: "ImportanceEnum") {
        name
        enumValues {
          name
          description
        }
    }
    
}
`;
const AddMedReactionQuery = gql`
    mutation addMedReaction($medicationId:UID!, $userId:UID!, $reaction:String!, $severity:Int!){
        medicationReactionAdd(medicationId:$medicationId, userId:$userId, reaction:$reaction, severity:$severity) {
            id
            reaction
            severity
            createdAt
        }
    }
`;

const AdverseReactionsWithQuery = graphql(GetMedReactionsQuery,
    {
        options: (ownProps) => {
            return   {
                variables: {
                    userId: ownProps.userId,
                    id: ownProps.item.id,
                },
                //fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    reactions: data.medication.reactions,
                    reactionTypes: data.reactionTypes.enumValues,
                    loading: data.loading
                }
            }
            else {
                return {loading: data.loading, reactions:[], reactionTypes:[]}
            }
        },
    }
)(AdverseReactions);

const withMutation = graphql(AddMedReactionQuery, {
    props: ({ownProps, mutate}) => ({
        addReaction: ({reaction, severity}) => {

            return mutate({
                variables: {
                    medicationId:ownProps.item.id,
                    userId:ownProps.userId,
                    reaction:reaction,
                    severity:severity
                },
                refetchQueries: [{
                    query: GetMedReactionsQuery,
                    variables: { userId: ownProps.userId,
                        id: ownProps.item.id},
                }],
            })
        },
    }),
});



export default withMutation(AdverseReactionsWithQuery);