import TumorboardsList from '../components/TumorboardsList';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TumorboardFragment} from "../fragments";

export const GET_TUMORBARDS_QUERY = gql`    
    query GET_TUMORBOARDS_LIST ($status: String) {
        getTumorboardsList (status: $status) {
            totalCount
            edges {
                ...TumorboardInfo
            }
        }
    }
    ${TumorboardFragment}
`;

// 1- add queries:
const withQuery = graphql(
    GET_TUMORBARDS_QUERY,
    {
        options: (ownProps) => {
            return {
                //skip: !ownProps.ready,
                /*variables: {
                    user_id: ownProps.user_id,
                    status: 'active'
                    //date:ownProps.date
                },*/
                fetchPolicy: 'network-only',
                //notifyOnNetworkStatusChange:true
            }

        },
        props: ({ ownProps, data }) => {
            if (!data.loading) {

                return {
                    items: data.getTumorboardsList.edges,
                    total: data.getTumorboardsList.totalCount,
                    loading: data.loading,
                    loadByStatus(status) {
                        return data.fetchMore({
                            // query: ... (you can specify a different query. FEED_QUERY is used by default)
                            variables: {
                                //user_id:ownProps.user_id,
                                status:status
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return fetchMoreResult;
                            },
                        });
                    },
                    // loadMoreEntries() {
                    //
                    //     return data.fetchMore({
                    //         // query: ... (you can specify a different query. FEED_QUERY is used by default)
                    //         variables: {
                    //             // We are able to figure out which offset to use because it matches
                    //             // the feed length, but we could also use state, or the previous
                    //             // variables to calculate this (see the cursor example below)
                    //             page: ownProps.page+1,
                    //         },
                    //         updateQuery: (previousResult, {fetchMoreResult}) => {
                    //             if (!fetchMoreResult) { return previousResult; }
                    //
                    //             return fetchMoreResult;
                    //             return Object.assign({}, previousResult, {
                    //                 // Append the new feed results to the old one
                    //                 planstore: {plans: [...previousResult.planstore.plans, ...fetchMoreResult.planstore.plans]},
                    //             });
                    //         },
                    //     });
                    // }
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);

export default withQuery(TumorboardsList);