
import Picture from '../components'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const profilePictureQUERY = gql`
   query getProfilePicture {
    account
    {
      user {
          id
          firstName
          thumbs {
            small
            large
            medium
          }
      }
    }
}
`;
const profilePictureMutation = gql`
 mutation updateProfilePicture($original:String!,$medium:String!, $large:String!, $small:String!){
        updateProfilePicture(original:$original,large:$large, small:$small, medium:$medium) {
              id,
              thumbs {
                small
                large
                medium
              }
    }
    }
`;

const PictureWithQuery = graphql(profilePictureQUERY,
    {
        props: ({ data}) => {
            if (!data.loading) {
                return {
                    letter: data.account.user.firstName[0],
                    thumbs: data.account.user.thumbs,
                    loading: data.loading,
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(Picture);

const withMutation = graphql(profilePictureMutation, {
    props: ({mutate}) => ({
        updatePicture: input => {
            return mutate({
                variables: input,
            })
        },
    }),
});


export default withMutation(PictureWithQuery);