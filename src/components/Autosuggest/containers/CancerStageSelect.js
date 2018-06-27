import CancerSelectPure from '../components/CancerSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const PlansListQUERY = gql`
    query GET_CANCER_STAEGES_LIST    {
        getCancerStages   {
            totalCount
            edges {
                id
                title
            }
        }
    }
`;

const CancerSelectWithQuery = graphql(PlansListQUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.getCancerStages.edges,
                    loading: data.loading,

                    doSearch(search) {
                        return data.fetchMore({
                            variables: {
                                search: search,
                            },
                            updateQuery: (previousResult, {fetchMoreResult}) => {
                                if (!fetchMoreResult) { return previousResult; }
                                return (fetchMoreResult);
                            },
                        });
                    }
                }
            } else {
                return {loading: data.loading}
            }
        },

    }
)(CancerSelectPure);

export default CancerSelectWithQuery;
export const CancerStageSelect = CancerSelectWithQuery;