import Timeline from '../components/Timeline';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {GET_TIMELINE_QUERY} from "../../Pathway/containers/Timeline";


const withQuery = graphql(
    GET_TIMELINE_QUERY,
    {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
                cursors: { first: 10}
            }
        }),
        props: ({data}) => {
            if (!data.loading) {
                const {edges=[], totalCount=0, pageInfo={}} = data.getTimeline || {};
                const {endCursor=''} = pageInfo;

                return {
                    items: edges,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);



export default withQuery(Timeline);