import DiagnosisSelectPure from '../components/DiagnosisSelect';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


export const DiagnosisListQUERY = gql`
    query GET_DIAGNOSES_LIST ($search: String)  {
        health {
            getDiagnosesList (search: $search) {
                id
                name
                code
            }
        }
    }
`;

const DiagnosisSelectWithQuery = graphql(DiagnosisListQUERY,
    {
        options: () => {
            return {
                fetchPolicy: 'network-only'
            }},
        props: ({ data }) => {
            if (!data.loading) {
                return {
                    items: data.health.getDiagnosesList,
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
)(DiagnosisSelectPure);

export default DiagnosisSelectWithQuery;

export const DiagnosisSelect = DiagnosisSelectWithQuery;