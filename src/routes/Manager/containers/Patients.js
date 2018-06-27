import Patients from '../components/Patients';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_PATIENTS_QUERY = gql`    
query GET_PATIENTS {
    management {
      getPatients {
        edges {
          id
          fullName
          gender
          age
          memberId
          getDiagnosis {
            id
            code {
              id
              name
            }
          }
        }
        totalCount
      }
    }
  }
  

`;

const withQuery = graphql(
    GET_PATIENTS_QUERY,
    {
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only'
            }
        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {
                return {
                    patients: data.management.getPatients.edges,
                    total: data.management.getPatients.totalCount,
                    loading: data.loading,
                    /*loadByStatus(status) {
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                user_id:ownProps.user_id,
                                status:status
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    },
                    loadMoreEntries() {

                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                // We are able to figure out which offset to use because it matches
                                // the feed length, but we could also use state, or the previous
                                // variables to calculate this (see the cursor example below)
                                page: ownProps.page+1,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }

                                return fetchMoreResult;
                                return Object.assign({}, previousResult, {
                                    // Append the new feed results to the old one
                                    planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                                });
                            },
                        });
                    }*/
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);

export default withQuery(Patients);