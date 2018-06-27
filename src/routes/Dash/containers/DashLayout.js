import DashLayout from '../components/DashLayout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_CURRENT_ROLE_QUERY = gql`
    query GET_CURRENT_ROLE {
      account {
         currentRole
      }
    }
`;

const withQuery = graphql(
    GET_CURRENT_ROLE_QUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'cache-first'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    currentRole: data.account.currentRole,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
)

export default withQuery(DashLayout);