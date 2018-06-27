import TrackerUnitsSelect from '../components/TrackerUnitsSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const TRACKERS_UNITS_LIST_QUERY = gql`
   query GET_TRACKERS_UNITS_LIST   {
            trackerUnitsList {
                id
                name
        }
    }
`;

const withQuery = graphql(TRACKERS_UNITS_LIST_QUERY,
    {
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.trackerUnitsList,
                    loading: data.loading,

                    /*doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }*/
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)

export default withQuery(TrackerUnitsSelect);