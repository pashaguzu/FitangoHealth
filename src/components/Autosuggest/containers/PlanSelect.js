import PlanSelect from '../components/PlanSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {PlanCardFragment} from "../../../routes/Plan/components/Plan/fragments";

export const PlansListQUERY = gql`
    query GET_PLANS_LIST ($search: String)  {
        planstore {
            plans (search: $search) {
                totalCount
                edges {
                    ...PlanCardInfo
                }
            }
        }
    }
    ${PlanCardFragment}
`;

const PlanSelectWithQuery = graphql(PlansListQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.planstore.plans.edges,
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
)(PlanSelect);

export default PlanSelectWithQuery;