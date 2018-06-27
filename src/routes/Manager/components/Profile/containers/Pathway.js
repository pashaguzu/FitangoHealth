import Pathway from '../components/Pathway';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
/*

const GET_PROFILE  = gql`
 query GET_PROFILE($user_id:UID) {
  user(id: $user_id) {
    id
    fullName
    thumbs {
      original
      small
      large
      medium
      wide
    }
  }
}


`;

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.match.params.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                user: data.user,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

*/

export default Pathway;