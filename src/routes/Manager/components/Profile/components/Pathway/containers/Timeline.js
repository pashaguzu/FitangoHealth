import Timeline from '../components/Timeline';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {TimelineElementFragment} from "../components/Timeline/fragments";

export const GET_TIMELINE_QUERY = gql`
 query GET_TIMELINE($userId:UID!, $cursors:CursorInput, $filters:[String]) {
   getTimeline (userId: $userId, cursors: $cursors, filters:$filters ) {
        totalCount
        edges{
             ...TimelineElement
        }
        pageInfo {
            endCursor
        }
   }
}
${TimelineElementFragment}
`;

const withQuery = graphql(GET_TIMELINE_QUERY, {
    options: (ownProps) => {
        return {
            variables: {
                userId:ownProps.userId,
                filters:ownProps.filters,
                //cursors: {after: ''}
            },
            fetchPolicy: 'network-only'
        }

    },
    props: ({ ownProps, data }) => {
        if (!data.loading) {
            const {edges=[], totalCount=0, pageInfo={}} = data.getTimeline || {};
            const {endCursor=''} = pageInfo;

            return {
                items: edges,
                endCursor: endCursor,
                loading: data.loading,
                totalCount:totalCount,
                hasMore: edges.length < totalCount,
                loadFiltered(filters, callback) {
                    return data.fetchMore({
                        variables: {
                            filters: filters
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {

                           // callback();

                            if (!fetchMoreResult) { return previousResult; }

                            return fetchMoreResult;
                            const obj =  Object.assign({}, previousResult, {
                                getTimeline: {
                                    ...previousResult.getTimeline, edges: fetchMoreResult.getTimeline.edges
                                }
                            });
                            return obj;
                        },
                    });
                },

                loadMore(endCursor, callback) {
                    return data.fetchMore({
                        variables: {
                            cursors: {before: endCursor, last:10}
                        },
                        updateQuery: (previousResult, { fetchMoreResult }) => {

                            callback();

                            if (!fetchMoreResult) { return previousResult; }

                            const newItems = [...previousResult.getTimeline.edges, ...fetchMoreResult.getTimeline.edges]
                            const obj =  Object.assign({}, previousResult, {
                                getTimeline: {
                                    ...previousResult.getTimeline, edges: newItems
                                }
                            });
                            return obj;
                        },
                    });
                }
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});



export default withQuery(Timeline);