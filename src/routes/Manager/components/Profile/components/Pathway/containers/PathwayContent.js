import PathwayContent from '../components/PathwayContent';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_PATHWAY_QUERY  = gql`
 query GET_USER_PATHWAY ($userId: UID!) {
  getUserPathway (userId: $userId) {
        id
        pathway {
            id
            title
            version
            cancer {
                id
                title
            }
        }
  }
}

`;

const withQuery = graphql(GET_USER_PATHWAY_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId: ownProps.userId,
            },
        }
    },
    props: ({ data }) => {
        if (data.getUserPathway || !data.loading) {
            return {
                userPathway: data.getUserPathway,
                pathway: data.getUserPathway.pathway,
                //pathwayId: data.getUserPathway.pathway.id,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});



const JoinPathwayMutation = gql`
    mutation LeavePathway($userId: UID!, $id:UID!){
        leavePathway(userId:$userId, id:$id)
    }
`;



const withMutation = graphql(JoinPathwayMutation, {
    props: ({ ownProps, mutate }) => ({
        leavePathway: (id) => {
            return mutate({
                variables: { userId: ownProps.userId, id: id}
            })
        },

    }),
});


export default withQuery(withMutation(PathwayContent));