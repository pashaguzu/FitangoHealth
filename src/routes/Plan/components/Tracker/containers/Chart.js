import { connect } from 'react-redux'
import TrackerChart from '../components/TrackerChart';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const TrackerSummaryQuery = gql`    
    query GetTrackerSummary ($id: UID!, $userId:UID!, $date: Date!)  {
        trackerMeasurement(id: $id) {
            id
            summary (date:$date, userId:$userId)  {
                date
                reports {
                    id
                    isCritical
                    value
                }
            }
        }
    }
`;

const TrackerChartWithQuery = graphql(
    TrackerSummaryQuery,
    {
        //name: 'PlanstorePlans',
        options: (ownProps) => ({
            variables: {
                id:ownProps.item.id,
                userId:ownProps.userId,
                date:ownProps.date
            },
            fetchPolicy: 'network-only'

        }),
        props: ({ ownProps, data }) => {
            if (!data.loading) {

                const trackerMeasurement = data.trackerMeasurement;
                return {
                    data: trackerMeasurement.summary,
                    //graph: trackerMeasurement.graph,
                    loading: data.loading,
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
                            },
                        });
                    }
                    /*increment() {
                         ownProps.increment(data.plans['actionplans']);
                    },
                    doubleAsync() {
                         // reset list of plans
                        ownProps.increment([]);
                    }*/
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(TrackerChart);

/* -----------------------------------------
  Redux
 ------------------------------------------*/

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TrackerChartWithQuery);