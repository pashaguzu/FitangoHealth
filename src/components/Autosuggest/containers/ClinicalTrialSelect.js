import ClinicalTrialSelectPure from '../components/ClinicalTrialSelect';
import { graphql } from 'react-apollo';
import {GET_CLINICAL_TRIALS_LIST_QUERY} from "../../../routes/Manager/components/ClinicalTrials/containers/ClinicalTrialsList";


const withQuery = graphql(GET_CLINICAL_TRIALS_LIST_QUERY,
    {
        options: () => {
            return {
                //fetchPolicy: 'network-only'
            }
        },
        props: ({ data }) => {
            if (!data.loading) {
                const {getClinicalTrialsList={}} = data;
                const {pageInfo={},edges=[], totalCount=0} = getClinicalTrialsList;
                const {endCursor} = pageInfo;
                return {
                    items: edges,
                    total: totalCount,
                    lastCursor: endCursor,
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

    });

export const ClinicalTrialSelect = withQuery(ClinicalTrialSelectPure);
export default ClinicalTrialSelect;