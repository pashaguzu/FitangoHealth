import PathwaySelect from '../components/PathwaySelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const GET_PATHWAYS_QUERY  = gql`
 query GET_PATHWAYS {
  getPathways(status:"published") {
    edges {
        id
        title
    }
  }
}


`;

const withQuery = graphql(GET_PATHWAYS_QUERY, {
    props: ({ data }) => {
        if (!data.loading) {
            const {edges} = data.getPathways;
            return {
                pathways: edges,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});



const JoinPathwayMutation = gql`
    mutation JoinPathway($userId: UID!, $id:UID!){
        joinPathway(userId:$userId, id:$id) {
            id
            pathway {
                id
                title
            }
        }
    }
`;



const withMutation = graphql(JoinPathwayMutation, {
    props: ({ ownProps, mutate }) => ({
        joinPathway: (id) => {
            return mutate({
                variables: { userId: ownProps.userId, id: id}
            })
        },

    }),
});


export default withQuery(withMutation(PathwaySelect));